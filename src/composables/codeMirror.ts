import {computed, onMounted, ref, Ref, watch} from "vue";
import useTheme from "src/composables/Themes";
import {EditorView, highlightActiveLine, keymap, lineNumbers, ViewPlugin, ViewUpdate} from "@codemirror/view";
import {basicSetup} from "codemirror";
import {Compartment, EditorState} from "@codemirror/state";
import {json} from "@codemirror/lang-json";
import {defaultKeymap, indentLess, insertTab} from "@codemirror/commands";
import {oneDark} from "components/commun/apiCallerDarkTheme";
import {espresso} from "thememirror";

export function useCodeMirror(
  el: Ref<any | null>,
  value: Ref<string | undefined>,
  editable: boolean
) {

  // Thème managment
  const currentTheme = useTheme();
  const codeMirrorTheme = computed(() => currentTheme.isDark() ? oneDark : espresso);
  // Clone value
  const jsonResponse = ref(value.value);
  // CodeMirror editor
  const editor = ref<EditorView>();
  // Comparment for theme managment
  const themeConfig = new Compartment();

  /**
   * Code mirror editor init
   * @param el
   */
  const initView = (el: any) => {
    const extensions = [
      basicSetup,
      highlightActiveLine(),
      lineNumbers(),
      EditorView.lineWrapping,
      themeConfig.of(codeMirrorTheme.value),
      EditorState.readOnly.of(!editable),
      json(),
      ViewPlugin.fromClass(
        class {
          update(update: ViewUpdate) {
            if (!editable) return;

            if (update.docChanged) {
              jsonResponse.value = update.state.doc
                .toJSON()
                .join(update.state.lineBreak)

              // // We do not update the cache directly in this case (to trigger value watcher to dispatch)
              // // So, we desync cachedValue a bit so we can trigger updates
              // const value = clone(jsonResponse.value).replaceAll("\n", "")
              value.value = jsonResponse.value;
            }
          }
        }
      ),
      keymap.of([
        ...defaultKeymap,
        {
          key: 'Tab',
          preventDefault: true,
          run: insertTab
        },
        {
          key: "Shift-Tab",
          preventDefault: true,
          run: indentLess,
        },
      ]),
      EditorView.contentAttributes.of({ "data-enable-grammarly": "false" }),
    ];
    // Code mirror editor create
    editor.value = new EditorView({
      parent: el,
      state: EditorState.create({
        doc: jsonResponse.value,
        extensions,
      }),
    })
  }

  /**
   * Watcher on theme change
   */
  watch(codeMirrorTheme, () => {
    if (editor.value){
      editor.value.dispatch({
        effects: themeConfig.reconfigure([codeMirrorTheme.value])
      })
    }
  });

  /**
   * init editor on mounted view
   */
  onMounted(() => {
    if (value.value){
      initView(el.value);
    }
  });

  /**
   * Watcher on model changed
   */
  watch(() => value.value, value => {
    if (jsonResponse.value !== value){
      editor.value?.dispatch({
        filter: false,
        changes: {
          from: 0,
          to: editor.value?.state.doc.length,
          insert:value
        }
      });
      jsonResponse.value = value;
    }
  })

}

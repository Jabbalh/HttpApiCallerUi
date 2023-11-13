import {computed, onMounted, ref, Ref, watch} from 'vue';
import useTheme from 'src/composables/Themes';
import {
  EditorView,
  keymap,
  ViewPlugin,
  ViewUpdate
} from '@codemirror/view';
import {Compartment, EditorState } from '@codemirror/state';
import {defaultKeymap} from '@codemirror/commands';
import {espresso} from 'thememirror';
import {AppEnvironnement} from 'src/models/model';
import {oneDark} from 'components/commun/apiCallerDarkTheme';
import {
  basicSetupArea,
  basicSetupSingleLine,
  manageKeyMap
} from 'src/helpers/editor/CodeMirrorExtensions';
import {environmentHighlightStyle} from 'src/helpers/editor/HighlightStyle';
import {cursorTooltipField} from 'src/helpers/editor/CursorTooltip';
import { jsonLanguage} from '@codemirror/lang-json';
import { xmlLanguage} from '@codemirror/lang-xml';
import {LANGUAGE} from 'src/models/Constantes';
import {html} from '@codemirror/legacy-modes/mode/xml';
import {StreamLanguage} from '@codemirror/language';


export function
useCodeMirror(
  el: Ref<Element | null>,
  value: Ref<string | undefined>,
  editable: boolean,
  singleLine: boolean,
  envs: Ref<AppEnvironnement[]>,
  language: Ref<string>
) {

  // Thème managment
  const currentTheme = useTheme();
  const codeMirrorTheme = computed(() => currentTheme.isDark() ? oneDark : espresso);
  // Clone value
  const jsonResponse = ref(value.value);
  // CodeMirror editor
  const editor = ref<EditorView>();
  // Compartment for theme managment
  const themeConfig = new Compartment();
  // Compartment for language
  const languageConfig = new Compartment();

  const compartment = new Compartment();

  const reconfigure = (envs: Ref<AppEnvironnement[]>) => {
    editor.value?.dispatch({
      effects: compartment.reconfigure([
        cursorTooltipField(envs),
        environmentHighlightStyle(envs),
      ]),
    })
  }

  const obtainLanguage = (lang: string) => {
    switch (lang) {
      case LANGUAGE.applicationJson: return jsonLanguage;
      case LANGUAGE.applicationXml : return xmlLanguage;
      case LANGUAGE.textHtml: return StreamLanguage.define(html);
    }
    return [];
  }

  /**
   * Code mirror editor init
   * @param el
   */
  const initView = (el: Element) => {
    const baseSetup = singleLine ? basicSetupSingleLine : basicSetupArea;
    const extensions = [
      ...baseSetup,
      themeConfig.of(codeMirrorTheme.value),
      EditorState.readOnly.of(!editable),
      compartment.of([
        cursorTooltipField(envs),
        environmentHighlightStyle(envs),
      ]),
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
        ...manageKeyMap(singleLine)
      ]),
      languageConfig.of(obtainLanguage(language.value)),
      EditorView.contentAttributes.of({ 'data-enable-grammarly': 'false' }),
    ];
    // Code mirror editor create
    editor.value = new EditorView({
      parent: el,
      state: EditorState.create({
        doc: jsonResponse.value,
        extensions
      }),
    })
  }

  watch(language, () => {
    if (editor.value){
      console.log('language', language.value);
      const langConfig = obtainLanguage(language.value);
      editor.value?.dispatch({
        effects: languageConfig.reconfigure(langConfig)
      });
    }
  })

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
    if (el.value){
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

  return {
    reconfigure
  }

}

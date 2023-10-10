import {computed, onMounted, ref, Ref, watch} from 'vue';
import useTheme from 'src/composables/Themes';
import {
  crosshairCursor, Decoration,
  drawSelection, dropCursor,
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter, highlightSpecialChars, hoverTooltip,
  keymap, lineNumbers,
  MatchDecorator, rectangularSelection,
  ViewPlugin,
  ViewUpdate
} from '@codemirror/view';
import {Compartment, EditorState } from '@codemirror/state';
import {json} from '@codemirror/lang-json';
import {defaultKeymap, historyKeymap, indentLess, insertTab, history} from '@codemirror/commands';
//import {oneDark} from 'components/commun/apiCallerDarkTheme';
import {espresso} from 'thememirror';
import {
  bracketMatching, defaultHighlightStyle,
  foldGutter, foldKeymap,
  indentOnInput,
  syntaxHighlighting
} from '@codemirror/language';
import {autocompletion, closeBrackets, closeBracketsKeymap, completionKeymap} from '@codemirror/autocomplete';
import {highlightSelectionMatches, search, searchKeymap} from '@codemirror/search';
import {lintKeymap} from '@codemirror/lint';
import {AppEnvironnement } from 'src/models/model';
import {ENV_REGEXT} from 'src/composables/parseEnv';
import {oneDark} from "components/commun/apiCallerDarkTheme";

const noSingleLineExtention = (singleLine: boolean) => {
  return singleLine
  ? []
  : [
      highlightActiveLineGutter(),
      highlightActiveLine(),
      foldGutter({
        openText: '▾',
        closedText: '▸',
      }),
    ]

}
const basicSetup = (singleLine: boolean) =>  [
  highlightSpecialChars(),
  drawSelection(),
  dropCursor(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  bracketMatching(),
  closeBrackets(),
  autocompletion(),
  rectangularSelection(),
  crosshairCursor(),
  ...noSingleLineExtention(singleLine),
  highlightSelectionMatches(),
  history(),
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
    ...lintKeymap,
  ]),
  search({
    top: true,
  }),
];


const cursorTooltipField = (aggregateEnvs: Ref<AppEnvironnement | null>) =>
  hoverTooltip(
    (view, pos, side) => {
      const { from, to, text } = view.state.doc.lineAt(pos)

      // Tracking the start and the end of the words
      let start = pos
      let end = pos

      while (start > from && /[a-zA-Z0-9-_]+/.test(text[start - from - 1]))
        start--
      while (end < to && /[a-zA-Z0-9-_]+/.test(text[end - from])) end++

      if (
        (start === pos && side < 0) ||
        (end === pos && side > 0) ||
        !ENV_REGEXT.test(
          text.slice(start - from - 2, end - from + 2)
        )
      )
        return null

      const parsedEnvKey = text.slice(start - from, end - from)

      const tooltipEnv = aggregateEnvs.value?.values.find((env) => env.key === parsedEnvKey)

      const envName = aggregateEnvs?.value?.name ?? 'Choose an Environment'

      const envValue = tooltipEnv?.value ?? 'Not found'

      const envTypeIcon = `<span class='inline-flex items-center justify-center my-1'></span>`

      return {
        pos: start,
        end: to,
        above: true,
        arrow: true,
        create() {
          const dom = document.createElement('span')
          const tooltipContainer = document.createElement('span')
          const kbd = document.createElement('kbd')
          const icon = document.createElement('span')
          icon.innerHTML = envTypeIcon
          icon.className = 'mr-2'
          kbd.textContent = envValue;
          tooltipContainer.appendChild(icon)
          tooltipContainer.appendChild(document.createTextNode(`${envName} `))
          tooltipContainer.appendChild(kbd)
          //if (tooltipEnv) appendEditAction(tooltipContainer)
          tooltipContainer.className = 'tippy-content'
          dom.className = 'tippy-box'
          dom.dataset.theme = 'tooltip'
          dom.appendChild(tooltipContainer)
          return { dom }
        },
      }
    },
    // HACK: This is a hack to fix hover tooltip not coming half of the time
    // https://github.com/codemirror/tooltip/blob/765c463fc1d5afcc3ec93cee47d72606bed27e1d/src/tooltip.ts#L622
    // Still doesn't fix the not showing up some of the time issue, but this is atleast more consistent
    { hoverTime: 1 }
  );

export const environmentHighlightStyle = (
  aggregateEnvs: Ref<AppEnvironnement | null>
) => {
  const decorator = getMatchDecorator(aggregateEnvs)

  return ViewPlugin.define(
    (view) => ({
      decorations: decorator.createDeco(view),
      update(u) {
        this.decorations = decorator.updateDeco(u, this.decorations)
      },
    }),
    {
      decorations: (v) => v.decorations,
    }
  )
}

const getMatchDecorator = (aggregateEnvs: Ref<AppEnvironnement | null>) =>
  new MatchDecorator({
    regexp: ENV_REGEXT,
    decoration: (m) => {
      return checkEnv(m[0], aggregateEnvs);
    },
  });

function checkEnv(env: string, aggregateEnvs: Ref<AppEnvironnement | null>) {
  const className = aggregateEnvs.value?.values.find(
    (k: { key: string }) => {
      return k.key === env.slice(2, -2);
    }
  )
    ? 'environnement-found'
    : 'environnement-not-found'
  return Decoration.mark({
    class: `cursor-help transition rounded px-1 focus:outline-none mx-0.5 env-highlight ${className}`,
  })
}

export function useCodeMirror(
  el: Ref<Element | null>,
  value: Ref<string | undefined>,
  editable: boolean,
  singleLine: boolean,
  envs: Ref<AppEnvironnement | null>
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

  const compartment = new Compartment();

  const extSingleLine = singleLine
    ? [EditorState.transactionFilter.of(tr => { return tr.newDoc.lines > 1 ? [] : [tr] })]
    : [];

  const reconfigure = (envs: Ref<AppEnvironnement | null>) => {
    editor.value?.dispatch({
      effects: compartment.reconfigure([
        cursorTooltipField(envs),
        environmentHighlightStyle(envs),
      ]),
    })
  }

  /**
   * Code mirror editor init
   * @param el
   */
  const initView = (el: Element) => {
    const extensions = [
      basicSetup(singleLine),
        ...extLineNumber(),
      EditorView.lineWrapping,
      themeConfig.of(codeMirrorTheme.value),
      EditorState.readOnly.of(!editable),
      json(),
      compartment.of([
        cursorTooltipField(envs),
        environmentHighlightStyle(envs),
      ]),
        ...extSingleLine,
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
          key: 'Shift-Tab',
          preventDefault: true,
          run: indentLess,
        },
      ]),
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

  const extLineNumber = () => {
    if (!singleLine){
      return [lineNumbers()];
    }
    return []
  }

  console.log("extLineNumber", extLineNumber())

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

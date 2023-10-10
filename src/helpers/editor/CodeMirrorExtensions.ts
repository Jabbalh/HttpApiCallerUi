import {
  crosshairCursor,
  drawSelection,
  dropCursor,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars, keymap, lineNumbers, rectangularSelection
} from "@codemirror/view";
import {
  bracketMatching,
  defaultHighlightStyle,
  foldGutter, foldKeymap,
  indentOnInput,
  syntaxHighlighting
} from "@codemirror/language";
import {defaultKeymap, history, historyKeymap, indentLess, insertTab} from "@codemirror/commands";
import {EditorState} from "@codemirror/state";
import {autocompletion, closeBrackets, closeBracketsKeymap, completionKeymap} from "@codemirror/autocomplete";
import {highlightSelectionMatches, search, searchKeymap} from "@codemirror/search";
import {lintKeymap} from "@codemirror/lint";

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
};

export const manageKeyMap = (singleLine: boolean) => {
  return singleLine
    ? []
    : [{
      key: 'Tab',
      preventDefault: true,
      run: insertTab
    },
      {
        key: 'Shift-Tab',
        preventDefault: true,
        run: indentLess,
      }]
}

export const extLineNumber = (singleLine: boolean) => {
  if (!singleLine){
    return [lineNumbers()];
  }
  return []
}

export const extSingleLine = (singleLine: boolean) => singleLine
  ? [EditorState.transactionFilter.of(tr => { return tr.newDoc.lines > 1 ? [] : [tr] })]
  : [];

export const basicSetup = (singleLine: boolean) =>  [
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

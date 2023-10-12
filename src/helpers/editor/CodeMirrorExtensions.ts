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
import {json} from "@codemirror/lang-json";

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

export const basicSetup = [
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

export const basicSetupSingleLine = [
  ...basicSetup,
  EditorState.transactionFilter.of(tr => { return tr.newDoc.lines > 1 ? [] : [tr] })
];

export const basicSetupArea = [
  ...basicSetup,
  json(),
  highlightActiveLineGutter(),
  highlightActiveLine(),
  foldGutter({
    openText: '▾',
    closedText: '▸',
  }),
  lineNumbers()
];

// export const basicSetup = (singleLine: boolean) =>  [
//
//   ...noSingleLineExtention(singleLine),
//
// ];

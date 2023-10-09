<template>
  <div ref="docResponse" style="height: auto"  />
</template>
<script lang="ts" setup>


import { json } from '@codemirror/lang-json';
import {computed, onBeforeUnmount, onMounted, ref, watch} from 'vue';
import { clone } from 'lodash';
import { espresso } from 'thememirror';
import useTheme from 'src/composables/Themes';
import {
  EditorView,
  lineNumbers,
  highlightActiveLine,
  ViewPlugin,
  ViewUpdate,
  keymap
} from '@codemirror/view';
import { oneDark } from '../commun/apiCallerDarkTheme'
import {Compartment, EditorState} from '@codemirror/state';
import {defaultKeymap, indentLess, insertTab} from "@codemirror/commands";
import {basicSetup} from "codemirror";

const props = defineProps<{
  modelValue: string,
  editable: boolean
}>();

const emit = defineEmits(['update:modelValue']);
const currentTheme = useTheme();
let jsonResponse = ref('');
jsonResponse.value = clone(props.modelValue);

const docResponse = ref<Element>();
const editor = ref<EditorView>();

// Gestion du theme (et du changement)
const codeMirrorTheme = computed(() => currentTheme.isDark() ? oneDark : espresso);

// Création du compartiment pour le thème
const themeConfig = new Compartment()

let editoreState: EditorState | null = null;

// Watcher pour le changement de thème
watch(codeMirrorTheme, () => {
  if (editor.value){
    editor.value.dispatch({
      effects: themeConfig.reconfigure([codeMirrorTheme.value])
    })
  }
})

const initView = () => {
  // Création du state de l'éditeur
  editoreState = EditorState.create({
    doc: jsonResponse.value,
    extensions:  [
      basicSetup,
      highlightActiveLine(),
      lineNumbers(),
      EditorView.lineWrapping,
      themeConfig.of(codeMirrorTheme.value),
      EditorState.readOnly.of(!props.editable),
      json(),
      ViewPlugin.fromClass(
        class {
          update(update: ViewUpdate) {
            if (!props.editable) return;

            if (update.docChanged) {
              jsonResponse.value = update.state.doc
                .toJSON()
                .join(update.state.lineBreak)

              // // We do not update the cache directly in this case (to trigger value watcher to dispatch)
              // // So, we desync cachedValue a bit so we can trigger updates
              // const value = clone(jsonResponse.value).replaceAll("\n", "")
              emit("update:modelValue", jsonResponse.value)
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
    ],
  });

  editor.value = new EditorView({
    state: editoreState,
    parent: docResponse.value,
  });
}

watch(() => props.modelValue, value => {
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

onBeforeUnmount(() => {
  editor.value?.destroy();
})

// Lorsque le omposant est monté, on peut charger l'éditeur (sinon on n'a pas la ref de la div docResponse
onMounted(() => {
  if (docResponse.value){
    initView();
  }
});


</script>

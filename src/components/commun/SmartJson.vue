<template>
  <div ref="docResponse" style="height: auto" @keydown="handleKeystroke" />
</template>
<script lang="ts" setup>


import { json } from '@codemirror/lang-json';
import {computed, onMounted, ref, watch} from 'vue';
import { clone } from 'lodash';
import { espresso } from 'thememirror';
import useTheme from 'src/composables/Themes';
import {EditorView, lineNumbers, highlightActiveLine, ViewPlugin, ViewUpdate} from '@codemirror/view';
import { oneDark } from '../commun/apiCallerDarkTheme'
import {Compartment, EditorState} from '@codemirror/state';
import {search} from '@codemirror/search';

const props = defineProps<{
  modelValue: string,
  editable: boolean
}>();

const emit = defineEmits(['update:modelValue']);

const currentTheme = useTheme();
let jsonResponse = ref('');
try {
  jsonResponse.value = clone(JSON.stringify(JSON.parse(props.modelValue), null, '\t'));
} catch{

}

const docResponse = ref<Element>();
const editor = ref<EditorView>();

// Gestion du theme (et du changement)
const codeMirrorTheme = computed(() => currentTheme.isDark() ? oneDark : espresso);

// Création du compartiment pour le thème
const themeConfig = new Compartment()

// Watcher pour le changement de thème
watch(codeMirrorTheme, () => {
  if (editor.value){
    editor.value.dispatch({
      effects: themeConfig.reconfigure([codeMirrorTheme.value])
    })
  }
})

// Création du state de l'éditeur
const editoreState = EditorState.create({
  doc: jsonResponse.value,
  extensions:  [
    search(),
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

            // We do not update the cache directly in this case (to trigger value watcher to dispatch)
            // So, we desync cachedValue a bit so we can trigger updates
            const value = clone(jsonResponse.value).replaceAll("\n", "")
            console.log('value', value);
            emit("update:modelValue", value)
          }
        }
      }
    )
  ],
});

// Lorsque le omposant est monté, on peut charger l'éditeur (sinon on n'a pas la ref de la div docResponse
onMounted(() => {
  if (docResponse.value){
    editor.value = new EditorView({
      state: editoreState,
      parent: docResponse.value,
    });
  }
});

const handleKeystroke = (_ev: KeyboardEvent) => {
  console.log('model', props.modelValue);
}

</script>

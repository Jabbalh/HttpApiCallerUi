<template>
  <div ref="docResponse" style="height: auto" />
</template>
<script lang="ts" setup>


import { json } from "@codemirror/lang-json";
import {computed, onMounted, ref, watch} from "vue";
import { clone } from "lodash";
//import {EditorView } from "codemirror";


import { espresso } from 'thememirror';
import useTheme from "src/composables/Themes";
import { EditorView, lineNumbers,highlightActiveLine} from "@codemirror/view";
import { oneDark } from '../commun/apiCallerDarkTheme'
import {Compartment, EditorState, Extension} from "@codemirror/state";
import {search} from "@codemirror/search";

const props = defineProps<{response: string}>();
const currentTheme = useTheme();
const jsonResponse = clone(JSON.stringify(JSON.parse(props.response), null, "\t"));

const docResponse = ref<Element>();
const editor = ref<EditorView>();

// Gestion du theme (et du changement)
const codeMirrorTheme = computed(() => currentTheme.isDark() ? oneDark : espresso);

// Création du compartiment pour le thème
const themeConfig = new Compartment()

// Watcher pour le changement de thème
watch(codeMirrorTheme, () => {
  console.log("watch theme");
  editor.value!.dispatch({
    effects: themeConfig.reconfigure([codeMirrorTheme.value])
  })
})

// Création du state de l'éditeur
const editoreState = EditorState.create({
  doc: jsonResponse,
  extensions:  [
    search(),
    highlightActiveLine(),
    lineNumbers(),
    EditorView.lineWrapping,
    themeConfig.of(codeMirrorTheme.value),
    EditorState.readOnly.of(true),
    json()
  ]
});

// Lorsque le omposant est monté, on peut charger l'éditeur (sinon on n'a pas la ref de la div docResponse
onMounted(() => {
  if (docResponse.value){
    editor.value = new EditorView({
      state: editoreState,
      parent: docResponse.value
    })
  }
})
</script>

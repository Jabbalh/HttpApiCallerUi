<template>
  <div ref="docResponse" style="height: 60vh">

  </div>

  <!--  <codemirror-->
  <!--    v-model="jsonResponse"-->

  <!--    placeholder="Please enter the code."-->
  <!--    :autofocus="true"-->
  <!--    :extensions="extensions"-->
  <!--    :indent-with-tab="true"-->
  <!--    :tab-size="2"-->
  <!--    lang-->
  <!--  />-->

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
const codeMirrorTheme = computed(() => currentTheme.isDark() ? oneDark : espresso);

const themeConfig = new Compartment()

const extension: Extension = [
  search(),
  highlightActiveLine(),
  lineNumbers(),
  EditorView.lineWrapping,
  themeConfig.of(codeMirrorTheme.value),
  EditorState.readOnly.of(true),

  json()
];

watch(codeMirrorTheme, () => {
  console.log("watch theme");
  editor.value!.dispatch({
    effects: themeConfig.reconfigure([codeMirrorTheme.value])
  })
})

const editoreState = EditorState.create({
  doc: jsonResponse,
  extensions: extension
});



onMounted(() => {
  if (docResponse.value){
    editor.value = new EditorView({
      state: editoreState,
      parent: docResponse.value
    })
  }

})



</script>

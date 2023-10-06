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
import {computed, onMounted, ref } from "vue";
import { clone } from "lodash";
//import {EditorView } from "codemirror";

import { oneDark } from "@codemirror/theme-one-dark";
import { espresso } from 'thememirror';
import useTheme from "src/composables/Themes";
import { EditorView} from "@codemirror/view";

const props = defineProps<{response: string}>();
const currentTheme = useTheme();
const jsonResponse = clone(JSON.stringify(JSON.parse(props.response), null, "\t"));

const docResponse = ref<Element>();
const codeMirrorTheme = computed(() => {
  return currentTheme.isDark() ? oneDark : espresso
});


onMounted(() => {
  if (docResponse.value){
    new EditorView({
      extensions: [
        codeMirrorTheme.value,
        json()
      ],
      parent: docResponse.value,
      doc: jsonResponse
    })
  }

})



</script>

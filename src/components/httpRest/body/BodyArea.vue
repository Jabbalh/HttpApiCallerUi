<template>
  <AreaInput
    ref="smartJson"
    :modelValue="tmpData"
    @update:modelValue="update"
    :editable="true"
    :language="languageValue"
  />
</template>

<script lang="ts" setup>
import AreaInput from "components/commun/AreaInput.vue";
import {useVModel} from "@vueuse/core";
import {RestRequest, RestRequestParameters} from "src/models/model";
import {useAppStore} from "stores/appStore";
import {ref} from "vue";

const props = defineProps<{
  modelValue: RestRequestParameters[] |  string,
  currentRequest?: RestRequest,
  languageValue: string
}>()
const emit = defineEmits(['update:modelValue'])
const data = useVModel(props, 'modelValue', emit);

const isRestRequestParameters = (values: any) : values is RestRequestParameters[] => {
  return !(typeof(values) == 'string');
}

let tmpData = isRestRequestParameters(data.value) ? ref('') : ref<string>(data.value);
const appState = useAppStore();
console.log('data.value',tmpData.value);
const update = (value: string) => {
  if (value != tmpData.value){
    if (props.currentRequest){
      appState.updateSaveAttribute(props.currentRequest,false);
    }
    emit('update:modelValue', value);
  }
}

</script>

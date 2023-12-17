<template>
  <RestHttpRequestParamValues
    v-model="tmpData"
    @add="addParametre"
    @delete="deleteParameter"
    @deleteAll="deleteAll"
    @updateRequest="onUpdate"
    :is-header="false"
  />
</template>
<script lang="ts" setup>
import {RestRequest, RestRequestParameters} from 'src/models/model';
import {useVModel} from '@vueuse/core/index';
import {useAppStore} from 'stores/appStore';
import RestHttpRequestParamValues from 'components/httpRest/RestHttpRequestParamValues.vue';
import remove from 'lodash/remove';
import maxBy from 'lodash/maxBy';

const props = defineProps<{
  modelValue: RestRequestParameters[] |  string,
  currentRequest?: RestRequest,
  languageValue: string
}>();

const emit = defineEmits(['update:modelValue'])
const data = useVModel(props, 'modelValue', emit);
const appState = useAppStore();
let tmpData = (typeof props.modelValue == 'string') ? Array.of<RestRequestParameters>({
  id: 1, entry: {value: '', key: '',active: true}
}) : props.modelValue;

const addParametre = () => {
  console.log("addParametre")
  if (tmpData) {
    const last = maxBy(tmpData, x => x.id);
    tmpData.push({
      id: (last?.id ?? 0) + 1,
      entry: { key: '',  value: '', active: true }
    });
  }
}

const isRestRequestParameters = (values: any) : values is RestRequestParameters[] => {
  return !(typeof(values) == 'string');
}

const deleteParameter = (value: RestRequestParameters) => {
  if (value && props.currentRequest && props.currentRequest.body.body && isRestRequestParameters(props.currentRequest.body.body) ){
    const p = props.currentRequest.body.body.find(x => x.id == value.id);
    if (p){
      remove(props.currentRequest.body.body, x => x.id == p.id);
      let i = 0;
      for (const item of props.currentRequest.body.body){
        item.id = ++i;
      }
      onUpdate();
    }
  }
}

const deleteAll = () => {
  tmpData = [];
}

const onUpdate = () => {
  if (props.currentRequest){
    data.value = tmpData;
    appState.updateSaveAttribute(props.currentRequest,false);
  }
}

</script>

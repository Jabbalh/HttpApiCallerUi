<template>
  <q-list>
    <q-item clickable @click="addCollection">
      <q-item-section>{{i18n.t('REST.MENU_COL_NEW_DIRECTORY')}}</q-item-section>
    </q-item>
    <q-item clickable @click="addRestRequest">
      <q-item-section>{{i18n.t('REST.MENU_COL_NEW_REQUEST')}}</q-item-section>
    </q-item>
    <q-item clickable @click="editCollection">
      <q-item-section>{{i18n.t('REST.MENU_COL_EDITER')}}</q-item-section>
    </q-item>
    <q-item clickable>
      <q-item-section>{{i18n.t('REST.MENU_COL_EXPORTER')}}</q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts" setup>
import {PropType} from 'vue';
import {useI18n} from 'vue-i18n';
import {RestCollection} from 'src/models/model';
import useRequestUtils from 'src/composables/RequestUtils';
import {useAppStore} from 'stores/appStore';
import {useVModel} from "@vueuse/core";

const i18n = useI18n();

const props = defineProps({
  modelValue: {
    type: Object as PropType<RestCollection>,
    required: true
  }
});
const emit = defineEmits(['update:modelValue']);
const data = useVModel(props, 'modelValue', emit );
const appStore = useAppStore();
const { addRequest, addFolder } = useRequestUtils();

const addRestRequest = async  () => {
  const request = await addRequest(undefined, true);
  appStore.addRequestOnCollection(request, props.modelValue);
  //data.value.requests.push(request);
}

const addCollection = async () => {
  const col = await addFolder();
  data.value.childs.push(col);
}

const editCollection = () => {
  addFolder(data.value)
}

</script>

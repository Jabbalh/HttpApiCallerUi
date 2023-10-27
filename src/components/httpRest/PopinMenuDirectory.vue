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
import useRequestUtils from 'src/composables/RequestUtils';
import {useAppStore} from 'stores/appStore';
import RestCollection from 'src/models/RestCollection';

const i18n = useI18n();

const props = defineProps({
  data: {
    type: Object as PropType<RestCollection>,
    required: true
  }
});
// const emit = defineEmits(['update:modelValue']);
// const data = useVModel(props, 'modelValue', emit );
const appStore = useAppStore();
const { addRequest, addFolder } = useRequestUtils();

const addRestRequest = async  () => {
  const request = await addRequest(undefined, true);
  appStore.addRequestOnCollection(request, props.data);
  //data.value.requests.push(request);
}

const addCollection = async () => {
  const col = await addFolder();
  appStore.addFolderOnCollection(col, props.data);
}

const editCollection = () => {
  addFolder(props.data)
}

</script>

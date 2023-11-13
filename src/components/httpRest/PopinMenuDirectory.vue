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
import {IRestCollection} from 'src/models/model';

const i18n = useI18n();

const props = defineProps({
  data: {
    type: Object as PropType<IRestCollection>,
    required: true
  }
});
const emits = defineEmits<{ (e: 'updateNode', value: IRestCollection): void }>();

const appStore = useAppStore();
const { addRequest, addFolder } = useRequestUtils();

const addRestRequest = async  () => {
  const request = await addRequest(undefined, true);
  appStore.addRequestOnCollection(request, props.data);
}

const addCollection = async () => {
  const col = await addFolder();
  appStore.addFolderOnCollection(col, props.data);
}

const editCollection = async () => {
  await addFolder(props.data);
  emits('updateNode', props.data );
}

</script>

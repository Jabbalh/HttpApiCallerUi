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
    <q-item clickable @click="deleteCollection">
      <q-item-section>{{i18n.t('REST.MENU_COL_DELETE')}}</q-item-section>
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
import usePopin from 'src/composables/PopinUtils';
import _remove from 'lodash/remove';

const i18n = useI18n();
const popinUtils = usePopin();

const props = defineProps({
  data: {
    type: Object as PropType<IRestCollection>,
    required: true
  }
});
const emits = defineEmits<{
  (e: 'updateNode', value: IRestCollection): void,
  (e: 'onClickAction'): void
}>();

const appStore = useAppStore();
const { addRequest, addFolder, findParentCollectionByIdCollection } = useRequestUtils();

/**
 * Ajout d'une nouvelle requète
 */
const addRestRequest = async  () => {
  emitOnClick();
  const request = await addRequest(undefined, true);
  appStore.addRequestOnCollection(request, props.data);
}

/**
 * Ajout d'une nouvelle collection
 */
const addCollection = async () => {
  emitOnClick();
  const col = await addFolder();
  appStore.addFolderOnCollection(col, props.data);
}

/**
 * Edit collection
 */
const editCollection = async () => {
  emitOnClick();
  await addFolder(props.data);
  emits('updateNode', props.data );
}

/**
 * Delete collection
 */
const deleteCollection = async () => {
  emitOnClick();
  const result = await popinUtils.openPopinConfirmation('REST.DELETE_FOLDER_TITLE', 'REST.DELETE_FOLDER_MESSAGE');
  if (result && props.data){
    const parent = findParentCollectionByIdCollection(appStore.restCollection, props.data.id);
    if (parent){
        _remove(parent.childs, x => x.id == props.data.id);
    }
  }
}

const emitOnClick = () => emits('onClickAction');

</script>

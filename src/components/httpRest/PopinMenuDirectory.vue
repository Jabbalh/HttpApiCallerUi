<template>
  <q-list>
    <q-item clickable>
      <q-item-section>{{i18n.t('REST.MENU_COL_NEW_DIRECTORY')}}</q-item-section>
    </q-item>
    <q-item clickable @click="addRestRequest">
      <q-item-section>{{i18n.t('REST.MENU_COL_NEW_REQUEST')}}</q-item-section>
    </q-item>
    <q-item clickable>
      <q-item-section>{{i18n.t('REST.MENU_COL_EDITER')}}</q-item-section>
    </q-item>
    <q-item clickable>
      <q-item-section>{{i18n.t('REST.MENU_COL_EXPORTER')}}</q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts" setup>

import {useI18n} from 'vue-i18n';
import {RestCollection} from 'src/models/model';
import useRequestUtils from 'src/composables/RequestUtils';
import {useAppStore} from 'stores/appStore';

const i18n = useI18n();
const props = defineModel<RestCollection>({
  required: true
});

//defineEmits(['update:modelValue']);
const appStore = useAppStore();
const { addRequest, findCollectionById } = useRequestUtils();

const addRestRequest = async  () => {
  const request = await addRequest();
  const parent = findCollectionById(appStore.restCollection, props.value.id);
  if (parent){
    parent.requests.push(request);
  }
}



</script>

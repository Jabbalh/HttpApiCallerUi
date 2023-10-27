<template>
  <q-list>
    <q-item clickable @click="editRequest">
      <q-item-section>{{i18n.t('REST.MENU_REQ_EDITER')}}</q-item-section>
    </q-item>
    <q-item clickable @click="deleteRequest">
      <q-item-section>{{i18n.t('REST.MENU_REQ_SUPPRIMER')}}</q-item-section>
    </q-item>
    <q-item clickable @click="editRequest">
      <q-item-section>{{i18n.t('REST.MENU_REQ_CLONE')}}</q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts" setup>
  import {useI18n} from 'vue-i18n';
  import {PropType} from 'vue/dist/vue';
  import {RestCollection, RestRequest} from 'src/models/model';
  import {useAppStore} from 'stores/appStore';
  import remove from 'lodash.remove';
  import useRequestUtils from 'src/composables/RequestUtils';

  const props = defineProps({
    request: {
      type: Object as PropType<RestRequest>,
      required: true
    }
  });

  const i18n = useI18n();
  const appStore = useAppStore();
  const { findParentCollectionById, addRequest } = useRequestUtils();
  const editRequest = () => {
    addRequest(props.request);
  }

  const deleteRequest = () => {
    const parent = findParentCollectionById(appStore.restCollection, props.request.id);
    if (parent){
      remove(parent.requests, (x: RestRequest) => x.id == props.request.id);
    }
    remove(appStore.openedRestRequest, (x: RestRequest | RestCollection) => x.id == props.request.id);
  }


</script>

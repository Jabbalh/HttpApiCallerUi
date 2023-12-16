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
  import {IRestCollection, RestRequest} from 'src/models/model';
  import {useAppStore} from 'stores/appStore';
  import remove from 'lodash.remove';
  import useRequestUtils from 'src/composables/RequestUtils';
  import usePopin from 'src/composables/PopinUtils';

  const props = defineProps({
    data: {
      type: Object as PropType<RestRequest>,
      required: true
    }
  });

  const emits = defineEmits<{
    (e: 'updateNode', value: RestRequest): void,
    (e: 'onClickAction'): void
  }>();

  const i18n = useI18n();
  const appStore = useAppStore();
  const popinUtils = usePopin();
  const { findParentCollectionById, addRequest } = useRequestUtils();
  const editRequest = async () => {
    emitOnClick();
    await addRequest(props.data);
    emits('updateNode', props.data);
  }

  const deleteRequest = async () => {
    emitOnClick();
    const ok = await popinUtils.openPopinConfirmation('REST.DELETE_FOLDER_TITLE', 'REST.DELETE_REQUEST_MESSAGE');
    if (ok){
      const parent = findParentCollectionById(appStore.restCollection, props.data.id);
      if (parent){
        remove(parent.requests, (x: RestRequest) => x.id == props.data.id);
      }
      remove(appStore.openedRestRequest, (x: RestRequest | IRestCollection) => x.id == props.data.id);
    }
  }

  const emitOnClick = () => emits('onClickAction');

</script>

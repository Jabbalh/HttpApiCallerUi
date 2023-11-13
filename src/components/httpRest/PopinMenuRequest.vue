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
  import {computed} from "vue";

  const props = defineProps({
    modelValue: {
      type: Object as PropType<RestRequest>,
      required: true
    }
  });

  const emits = defineEmits<{ (e: 'update:modelValue', value: RestRequest): void }>();

  const localModel = computed({
    get : () => props.modelValue,
    set: (value: RestRequest) => emits("update:modelValue", value)
  });

  const i18n = useI18n();
  const appStore = useAppStore();
  const { findParentCollectionById, addRequest } = useRequestUtils();
  const editRequest = () => {
    addRequest(localModel.value);
    emits('update:modelValue', localModel.value);
  }

  const deleteRequest = () => {
    const parent = findParentCollectionById(appStore.restCollection, localModel.value.id);
    if (parent){
      remove(parent.requests, (x: RestRequest) => x.id == localModel.value.id);
    }
    remove(appStore.openedRestRequest, (x: RestRequest | IRestCollection) => x.id == localModel.value.id);
  }


</script>

<template>
  <details class="tree-nav__item is-expandable">
      <summary class="tree-nav__item-title" >
        <span >{{collection.name}}</span>
        <span>

          <q-icon name="more_vert" style=" float: right; z-index: 99;">
            <q-popup-proxy >
              <PopinMenuDirectory :folder="collection" />
            </q-popup-proxy>
          </q-icon>
        </span>
      </summary>


    <template v-for="(col, index) in localCollections" :key="index" >
      <SmartTreeViewFolder :collection="col"  :display-menu="displayMenu" />
    </template>
    <SmartTreeViewLeaf :items="localRequest" @open="openRequest" />
  </details>
</template>
<script lang="ts" setup>

import {RestCollection, RestRequest} from "src/models/model";
import {computed, defineComponent} from "vue";
import SmartTreeViewLeaf from "components/commun/TreeView/SmartTreeViewLeaf.vue";
import PopinMenuDirectory from "components/httpRest/PopinMenuDirectory.vue";
import {useAppStore} from "stores/appStore";

  defineComponent({SmartTreeViewLeaf})
  const props = defineProps<{
    collection: RestCollection,
    displayMenu: boolean}>();
  const emit = defineEmits<{
    (e: 'open-folder', value: RestCollection): void,
    (e: 'open-request', value: RestRequest): void,
  }>()

  const localCollections = computed(() => props.collection.childs);
  const localRequest = computed(() => props.collection.requests);
  const appStore = useAppStore();
  const openFolder = (event: Event,value: RestCollection) => {
      // value.isOpen = true;
      // appStore.openRequest(value);
      // event.stopPropagation();
    emit('open-folder', value);
  };
  const openRequest = (value: RestRequest) => emit('open-request', value);


</script>

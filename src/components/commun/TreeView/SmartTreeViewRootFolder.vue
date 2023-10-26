<template>
  <div class="tree-nav__item is-expandable">
    <div class="tree-nav__item-title">{{item.name}}</div>
    <template v-for="(item, index) in localCollections" :key="index">
      <SmartTreeViewFolder   :collection="item" @click="openFolder(item)" :display-menu="displayMenu" />
      <q-icon name="more_vert" style=" float: right; z-index: 1;">
        <q-popup-proxy >
          <PopinMenuDirectory :folder="item" />
        </q-popup-proxy>
      </q-icon>
    </template>
    <SmartTreeViewLeaf :items="localRequest" @open="openRequest" />
  </div>
</template>
<script lang="ts" setup>

import {RestCollection, RestRequest} from "src/models/model";
import {computed, defineComponent} from "vue";
import SmartTreeViewLeaf from "components/commun/TreeView/SmartTreeViewLeaf.vue";
import PopinMenuDirectory from "components/httpRest/PopinMenuDirectory.vue";
import SmartTreeViewFolder from "components/commun/TreeView/SmartTreeViewFolder.vue";

defineComponent({SmartTreeViewLeaf})
const props = defineProps<{
  item: RestCollection,
  displayMenu: boolean}>();
const emit = defineEmits<{
  (e: 'open-folder', value: RestCollection): void,
  (e: 'open-request', value: RestRequest): void,
}>()

const localCollections = computed(() => props.item.childs);
const localRequest = computed(() => props.item.requests);

const openFolder = (value: RestCollection) => emit('open-folder', value);
const openRequest = (value: RestRequest) => emit('open-request', value);


</script>

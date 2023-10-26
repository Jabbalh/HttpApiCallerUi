<template>
  <nav class="smart-tree">
    <a class="tree-nav__item-title">
      <i class="icon ion-scissors"></i>
      Vos collections
    </a>
      <SmartTreeViewFolder
        v-for="(item, index) in collection"
        :key="index"
        :collection="item"
        @open-request="openItem"
        @open-folder="openFolder"
        :display-menu="true"
      />
  </nav>
</template>
<script lang="ts" setup>

import SmartTreeViewFolder from "components/commun/TreeView/SmartTreeViewFolder.vue";
import {RestCollection, RestRequest} from "src/models/model";
import {useAppStore} from "stores/appStore";


const props = defineProps<{
  collection: RestCollection[]
}>();

const appStore = useAppStore();

const openItem = (x: RestRequest | RestCollection) => {
  console.log('openItem', x);
  x.isOpen = true;
  appStore.openRequest(x);
};

const openFolder = (value: RestCollection) => {
  console.log('openFolder', value);
  value.isOpen = true;
  appStore.openRequest(value);
}

</script>

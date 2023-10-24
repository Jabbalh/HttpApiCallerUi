<template>
  <nav class="smart-tree">
    <a class="tree-nav__item-title">
      <i class="icon ion-scissors"></i>
      Vos collections
    </a>
      <SmartTreeViewFolder v-for="(item, index) in collection" :key="index" :item="item">

      </SmartTreeViewFolder>
  </nav>

  <nav class="smart-tree">

    <a class="tree-nav__item-title">
      <i class="icon ion-scissors"></i>
      Test
    </a>

    <details class="tree-nav__item is-expandable">
      <summary class="tree-nav__item-title">The Realm of the Elderlings</summary>

      <details class="tree-nav__item is-expandable">

        <summary class="tree-nav__item-title">The Six Duchies</summary>
        <details class="tree-nav__item is-expandable">
          <summary class="tree-nav__item-title">The Farseer Trilogy</summary>
          <div class="tree-nav__item">
           Hello world
          </div>
        </details>

        <details class="tree-nav__item is-expandable">
          <summary class="tree-nav__item-title">The Tawny Man Trilogy</summary>
          <div class="tree-nav__item">
            <a class="tree-nav__item-title"><i class="icon ion-cube"></i> FOOL'S ERRAND</a>
            <a class="tree-nav__item-title"><i class="icon ion-ios-book"></i> GOLDEN FOOL</a>
            <a class="tree-nav__item-title"><i class="icon ion-ios-bookmarks"></i> FOOL'S FATE</a>
          </div>
        </details>


      </details>
    </details>

    <details class="tree-nav__item is-expandable">
      <summary class="tree-nav__item-title">The Soldier Son trilogy</summary>
      <div class="tree-nav__item">
        <a class="tree-nav__item-title"><i class="icon ion-edit"></i> SHAMAN'S CROSSING</a>
        <a class="tree-nav__item-title"><i class="icon ion-paperclip"></i> FOREST MAGE</a>
      </div>
    </details>

  </nav>
</template>
<script lang="ts" setup>

import SmartTreeViewFolder from "components/commun/TreeView/SmartTreeViewFolder.vue";
import {RestCollection} from "src/models/model";

const props = defineProps<{
  collection: RestCollection[]
}>()

</script>

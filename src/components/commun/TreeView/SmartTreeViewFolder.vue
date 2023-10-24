<template>
  <details class="tree-nav__item is-expandable">
    <summary class="tree-nav__item-title">{{item.name}}</summary>
    <SmartTreeViewFolder v-for="(item, index) in localCollections" :key="index" :item="item" />
    <SmartTreeViewLeaf :items="localRequest" />

  </details>
</template>
<script lang="ts" setup>

import {RestCollection} from "src/models/model";
import {isCollection} from "src/composables/ActiveRequest";
import {computed, defineComponent} from "vue";
import SmartTreeViewLeaf from "components/commun/TreeView/SmartTreeViewLeaf.vue";

defineComponent({SmartTreeViewLeaf})

const props = defineProps<{
    item: RestCollection}>();

  const localCollections = computed(() => props.item.childs);
  const localRequest = computed(() => props.item.requests);

    const testItem = computed(() => isCollection(props.item) ? 'SmartTreeViewFolder' :'SmartTreeViewLeaf');

</script>

<template>
  <div class="tree-nav__item leaf">
    <div v-for="(item, index) in items" :key="index">
      <a class="tree-nav__item-title"><i class="icon ion-cube"></i> {{item.name}}</a>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import {RestRequest} from "src/models/model";

  const props = defineProps<{
    items: RestRequest[]
  }>()
</script>

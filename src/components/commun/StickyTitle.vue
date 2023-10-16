<template>
  <div class="row sticky-title sticky-tabs top-tertiary" >
    <div class="rest-parametre-titre">{{ title }}</div>
    <slot />
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  title: string
}>()
</script>
<style scoped lang="scss">
.sticky-title {
  padding-left: 16px;
  margin-bottom: 8px;
  color:$color-secondary;
  font-size: 12px;
  font-weight: 600;
}
</style>

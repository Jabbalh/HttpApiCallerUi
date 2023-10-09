<template>
  <div class="q-ml-xs q-mr-xs">
    <input type="text"
           class="smart-input"
           :value="modelValue"
           :placeholder="placeHolder"
           @input="onUpdate"  />
  </div>
</template>
<script lang="ts" setup>
defineProps({
  modelValue: String,
  placeHolder: String
});
const emits = defineEmits(['update:modelValue']);

const onUpdate = ($event: any) => {
  emits('update:modelValue', $event.target.value);
}
</script>
<style lang="scss">
.smart-input {
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  color: var(--q-panel-color-font);
  &:focus {
    outline: none;
  }
}
</style>

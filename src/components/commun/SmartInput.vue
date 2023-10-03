<template>
  <div class="q-ml-xs q-mr-xs">
    <input type="text"
           class="smart-input"
           :value="modelValue" @input="onUpdate"  />
  </div>

<!--  <q-input  dense-->
<!--            borderless-->
<!--            :value="modelValue"-->
<!--            @input="onUpdate"-->
<!--            class="q-ma-none q-pa-none"-->
<!--            input-style="height:20px"-->
<!--            hide-bottom-space-->
<!--            />-->
</template>
<script lang="ts" setup>
  const props = defineProps({
    modelValue: String,
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

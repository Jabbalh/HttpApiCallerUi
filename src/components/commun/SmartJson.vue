<template>
  <div ref="docResponse" style="height: auto"  />
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useCodeMirror } from "src/composables/codeMirror";

const props = defineProps<{
  modelValue: string,
  editable: boolean
}>();

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value)
});
const docResponse = ref<Element>();
useCodeMirror(
  docResponse,
  value,
  props.editable
);


</script>

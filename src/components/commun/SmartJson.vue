<template>
  <div ref="docResponse" style="height: auto"  />
</template>
<script lang="ts" setup>
import {computed, ref, watch} from 'vue';
import { useCodeMirror } from "src/composables/codeMirror";
import {useEnvStore} from "stores/EnvStore";

const props = defineProps<{
  modelValue: string,
  editable: boolean
}>();

const appEnv = useEnvStore();
const envs = computed(() => appEnv.Current);
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value)
});

const docResponse = ref<Element>();
const editor = useCodeMirror(
  docResponse,
  value,
  props.editable,
  envs
);

watch(envs, () => {
  editor.reconfigure(envs);
})


</script>

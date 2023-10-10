<template>
  <div ref="docResponse" style="height: auto; background-color: transparent"  />
</template>
<script lang="ts" setup>
import {computed, ref, watch} from 'vue';
import { useCodeMirror } from "src/composables/codeMirror";
import {useEnvStore} from "stores/EnvStore";

const props = defineProps<{
  modelValue: string,
  editable: boolean,
  singleLine: boolean
}>();

const appEnv = useEnvStore();
const envs = computed(() => appEnv.Current);
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value)
});

const docResponse = ref<Element | null>(null);
const editor = useCodeMirror(
  docResponse,
  value,
  props.editable,
  props.singleLine,
  envs
);

watch(envs, () => {
  editor.reconfigure(envs);
})


</script>

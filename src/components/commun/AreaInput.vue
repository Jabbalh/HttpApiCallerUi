<template>
  <div class="input-wrapper">
    <div ref="docResponse" style="height: auto;width: 100%; background-color: transparent"  />
  </div>

</template>
<script lang="ts" setup>
import {computed, ref, watch} from 'vue';
import { useCodeMirror } from 'src/composables/codeMirror';
import useParseEnv from 'src/composables/parseEnv';

const props = withDefaults(defineProps<{
  modelValue: string,
  editable: boolean,
  language: string,
  placeholder: string
}>(), {
  editable: true,
  language: '',
  modelValue: '',
  placeholder: ''
});

const { computedEnv } = useParseEnv();
const envs = computed(() => computedEnv());
const emit = defineEmits(['update:modelValue']);
const value = computed({
  get: () => props.modelValue,
  set: (value: string) => {
    if (value != props.modelValue){
      emit('update:modelValue', value);
    }
  }
});

const docResponse = ref<Element | null>(null);
const lang = computed(() => props.language);
const editor = useCodeMirror(
  docResponse,
  value,
  props.editable,
  false,
  envs,
  lang,
  props.placeholder
);

watch(envs, () => {
  editor.reconfigure(envs);
})

</script>
<style scoped lang="scss">
.input-wrapper {
  position: relative;
  display: flex;
  flex: 1 1 0;
  white-space: nowrap;
  cursor: text;
}
</style>

<template>
  <div class="input-wrapper">
    <div ref="docResponse" style="height: auto;width: 100%; background-color: transparent"  />
  </div>

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
  set: (value: string) => {
    if (value != props.modelValue){
      emit('update:modelValue', value);
    }
  }
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

// watch(() => props.modelValue, (newValue, oldValue) => {
//   if (newValue != oldValue) {
//     console.log('newValue')
//   } else {
//     console.log('idem value')
//   }
// })


</script>
<style scoped lang="scss">
.input-wrapper {
  position: relative;
  display: flex;
  flex: 1 1 0%;
  flex-shrink: 0;
  white-space: nowrap;
  cursor: text;
}
</style>

<template>
  <div>
    <AreaInput
      :editable="true"
      v-model="model"
      :language="LANGUAGE.javascript"
      placeholder="Saisissez votre code ici ..."
      @update:modelValue="emit('updateRequest')"/>
  </div>
</template>
<script lang="ts" setup>
  import {useVModel} from "@vueuse/core";
  import AreaInput from "components/commun/AreaInput.vue";
  import {LANGUAGE} from "src/models/Constantes";

  const props = withDefaults(defineProps<{modelValue: string}>(), {modelValue: ''});
  const emit = defineEmits<{
    (e: 'update:modelValue', value: string) : void,
    (e: 'updateRequest'): void
  }>();
  const model = useVModel(props, 'modelValue', emit);


</script>

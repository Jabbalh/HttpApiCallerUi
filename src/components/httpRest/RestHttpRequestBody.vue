<template>
  <!--  {{modelValue}}-->
  <!--  <q-separator />-->
  <SmartJson
    ref="smartJson"
    v-if="currentRequest"
    :modelValue="modelValue"
    @update:modelValue="update"
    :editable="true"
  :single-line="false"/>
</template>
<script lang="ts" setup>

import SmartJson from 'components/commun/SmartInput.vue';
import {useAppStore} from 'stores/appStore';
import {computed, defineComponent } from 'vue';

defineComponent({SmartJson});

const appState = useAppStore();
const currentRequest = computed(() => appState.activeRestRequest);
const props = withDefaults(defineProps<{ modelValue: string  }>(), { modelValue: '' });
const emit = defineEmits(['update:modelValue']);

const update = (value: string) => {
  if (value != props.modelValue){
    if (currentRequest.value){
      appState.updateSaveAttribute(currentRequest.value,false);
    }
    emit('update:modelValue', value);
  }

}

</script>

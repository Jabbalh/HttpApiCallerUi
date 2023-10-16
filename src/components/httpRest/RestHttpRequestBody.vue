<template>
  <div style="position: relative;height: 100%; overflow: hidden">
    <div class="row rest-parameter-title sticky-tabs top-tertiary " style="">
      <div class="rest-body-title" >
        Type de contenu
      </div>
      <div class="rest-http-body-select">
        <q-select
          :options="optionsLanguage"
          v-model="languageValue"
          outlined
          dense
          hide-bottom-space
          item-aligned
          dropdown-icon="expand_more"
          class=""/>
      </div>
    </div>
    <div style="overflow: auto;height: calc(100% - 50px); ">
      <AreaInput
        ref="smartJson"
        v-if="currentRequest"
        :modelValue="modelValue"
        @update:modelValue="update"
        :editable="true"
        :language="languageValue"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>

import AreaInput from 'components/commun/AreaInput.vue';
import {useAppStore} from 'stores/appStore';
import {computed, defineComponent, ref} from 'vue';
import {LANGUAGE, OPTIONS_LANGUAGE} from 'src/models/Constantes';

defineComponent({AreaInput});

const appState = useAppStore();
const currentRequest = computed(() => appState.activeRestRequest);
const props = withDefaults(defineProps<{ modelValue: string  }>(), { modelValue: '' });
const emit = defineEmits(['update:modelValue']);

const languageValue = ref(LANGUAGE.applicationJson);
const optionsLanguage = OPTIONS_LANGUAGE;

const update = (value: string) => {
  if (value != props.modelValue){
    if (currentRequest.value){
      appState.updateSaveAttribute(currentRequest.value,false);
    }
    emit('update:modelValue', value);
  }

}

</script>
<style lang="scss">
.rest-body-title {
  margin-right: 16px;
}
</style>

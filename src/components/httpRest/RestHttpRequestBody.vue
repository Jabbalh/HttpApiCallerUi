<template>
  <div style="position: relative;height: 100%; overflow: hidden">
    <div class="row rest-parameter-title sticky-tabs top-tertiary " style="">
      <div class="rest-body-title" >
        {{i18n.t('REST.PARAM_BODY_CONTENU_TITLE')}}
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
          class="select input-box q-pa-none"/>
      </div>
    </div>
    <div  v-if="displayEditor"
          style="overflow: auto;height: calc(100% - 50px); ">
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
import {useI18n} from "vue-i18n";

defineComponent({AreaInput});

const appState = useAppStore();
const currentRequest = computed(() => appState.activeRestRequest);
const props = withDefaults(defineProps<{ modelValue: string  }>(), { modelValue: '' });
const emit = defineEmits(['update:modelValue']);
const i18n = useI18n();
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


const displayEditor = computed(() => languageValue.value != LANGUAGE.nothing);

</script>
<style lang="scss" scoped>
:deep(.input-box .q-field__control),
:deep(.input-box .q-field__control:before),
:deep(.input-box .q-field__native),
:deep(.input-box .q-field__marginal){
  height: 30px;
  font-size: 0.8rem;
  min-height: 30px;
}

.rest-body-title {
  margin-right: 16px;
  align-self: center;
}
</style>

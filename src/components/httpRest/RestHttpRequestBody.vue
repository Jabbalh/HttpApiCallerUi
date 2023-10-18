<template>
  <div style="position: relative;height: 100%; overflow: hidden">
    <div class="row rest-parameter-title sticky-tabs top-tertiary " style="">
      <div class="rest-body-title" >
        {{i18n.t('REST.PARAM_BODY_CONTENU_TITLE')}}
      </div>
      <div class="rest-http-body-select">
        <q-select
          :options="optionsLanguage"
          v-model="dataModel.language"
          @update:modelValue="updateLanguage"
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
      <BodyArea
        v-if="displayArea"
        v-model="dataModel.body"
        :languageValue="dataModel.language"
        :currentRequest="currentRequest" />
      <div v-else>
        <BodyForm
          v-model="dataModel.body"
          :languageValue="dataModel.language"
          :currentRequest="currentRequest" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

import AreaInput from 'components/commun/AreaInput.vue';
import {useAppStore} from 'stores/appStore';
import {computed, defineComponent} from 'vue';
import {isRawBody, LANGUAGE, OPTIONS_LANGUAGE} from 'src/models/Constantes';
import {useI18n} from 'vue-i18n';
import {RestRequestBody} from 'src/models/types/RestRequestBody';
import BodyArea from "components/httpRest/body/BodyArea.vue";
import {useVModel} from "@vueuse/core";
import BodyForm from "components/httpRest/body/BodyForm.vue";

defineComponent({AreaInput});

const appState = useAppStore();
const currentRequest = computed(() => appState.activeRestRequest);
const props = withDefaults(
  defineProps<{
    modelValue: RestRequestBody
  }>(),
  {
    modelValue: () => {
      return {
        language: LANGUAGE.nothing,
        body: ''
      }
    }
  });

const emit = defineEmits(['update:modelValue']);
const dataModel = useVModel(props, 'modelValue', emit);
const i18n = useI18n();
const optionsLanguage = OPTIONS_LANGUAGE;
const displayEditor = computed(() => dataModel.value.language != LANGUAGE.nothing);
const displayArea = computed(() => isRawBody(dataModel.value.language));

const updateLanguage = () => {
  if (currentRequest.value){
    appState.updateSaveAttribute(currentRequest.value,false);
  }
}

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

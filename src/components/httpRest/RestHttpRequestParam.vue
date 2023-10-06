<template>
  <q-tabs
    v-model="restParamOnglet"
    indicator-color="accent"
    narrow-indicator
    align="left"
    dense
    class="col-12 rest-onglet-param sticky-tabs z-index-10 top-secondary"
  >
    <q-tab name="PARAMETERS" :label="i18n.t('REST.PARAM_ONGLET_PARAM')" no-caps  :ripple="false" />
    <q-tab name="BODY" no-caps :label="i18n.t('REST.PARAM_ONGLET_BODY')" :ripple="false" />
    <q-tab name="HEADERS" no-caps :label="i18n.t('REST.PARAM_ONGLET_HEADERS')" :ripple="false" />
    <q-tab name="AUTH" no-caps :label="i18n.t('REST.PARAM_ONGLET_AUTH')" :ripple="false" />
    <q-tab name="PREREQUEST" no-caps :label="i18n.t('REST.PARAM_ONGLET_PRE_REQ')" :ripple="false" />
    <q-tab name="TESTS" no-caps :label="i18n.t('REST.PARAM_ONGLET_TESTS')" :ripple="false" />
  </q-tabs>
  <q-tab-panels
    v-model="restParamOnglet"
    class="" style="width: 100%"
    >
    <q-tab-panel name="PARAMETERS">
      <RestHttpRequestParamValues />
    </q-tab-panel>
    <q-tab-panel name="BODY">
        <RestHttpRequestBody />
    </q-tab-panel>
    <q-tab-panel name="HEADERS">
      Headers
    </q-tab-panel>
    <q-tab-panel name="AUTH">
      Auth
    </q-tab-panel>
    <q-tab-panel name="PREREQUEST">
      Prerequest
    </q-tab-panel>
    <q-tab-panel name="TESTS">
      Tests
    </q-tab-panel>
  </q-tab-panels>
</template>

<script lang="ts" setup>
  import {ref} from 'vue';
  import {useI18n} from 'vue-i18n';
  import RestHttpRequestParamValues from 'components/httpRest/RestHttpRequestParamValues.vue';
  import RestHttpRequestBody from "components/httpRest/RestHttpRequestBody.vue";

  const restParamOnglet = ref('PARAMETERS');
  const i18n = useI18n();

</script>
<style lang="scss">
  .rest-onglet-param {
    border-bottom: 1px solid;
    border-color: var(--q-panel-border);
  }
</style>

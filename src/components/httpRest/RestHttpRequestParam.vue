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
  <!--  <div class="" style="display: contents">-->
  <q-tab-panels
    v-if="activeRestRequest"
    v-model="restParamOnglet"
    class="full-width full-height"
  >
    <q-tab-panel name="PARAMETERS" >
      <RestHttpRequestParamValues
        v-model="activeRestRequest.parameter"
        :is-header="false"
        @add="addParameter"
        @delete="deleteParameter"
        @deleteAll="deleteAllParameter"
        @updateRequest="onUpdate"
      />
    </q-tab-panel>
    <q-tab-panel name="BODY">
      <RestHttpRequestBody v-model="activeRestRequest.body" />
    </q-tab-panel>
    <q-tab-panel name="HEADERS">
      <RestHttpRequestParamValues
        v-model="activeRestRequest.header"
        :is-header="true"
        @add="addHeader"
        @delete="deleteHeader"
        @deleteAll="deleteAllHeader"
        @updateRequest="onUpdate"
      />
    </q-tab-panel>
    <q-tab-panel name="AUTH">
      <RestHttpRequestAuth v-model="activeRestRequest.authorization" @updateRequest="onUpdate" />
    </q-tab-panel>
    <q-tab-panel name="PREREQUEST">
      Prerequest
    </q-tab-panel>
    <q-tab-panel name="TESTS">
      <RestHttpRequestTest />
    </q-tab-panel>
  </q-tab-panels>
  <!--  </div>-->
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import {useI18n} from 'vue-i18n';
import RestHttpRequestParamValues from 'components/httpRest/RestHttpRequestParamValues.vue';
import RestHttpRequestBody from 'components/httpRest/RestHttpRequestBody.vue';
import {useAppStore} from 'stores/appStore';
import maxBy from 'lodash/maxBy';
import {RestRequest, RestRequestParameters} from 'src/models/model';
import remove from 'lodash/remove';
import RestHttpRequestAuth from 'components/httpRest/RestHttpRequestAuth.vue';
import RestHttpRequestTest from "components/httpRest/RestHttpRequestTest.vue";

export default defineComponent({
  name: 'RestHttpRequestParam',
  components: {RestHttpRequestTest, RestHttpRequestAuth, RestHttpRequestParamValues,RestHttpRequestBody  },
  setup(){
    const appState = useAppStore();
    return {
      restParamOnglet: ref('PARAMETERS'),
      i18n: useI18n(),
      appState,
      activeRestRequest: computed(() => appState.activeRestRequest as RestRequest)
    }
  },
  methods: {
    /**
     * Ajout d'un nouveau paramètre
     */
    addParameter() {
      this.add(this.activeRestRequest?.parameter);
    },
    addHeader() {
      this.add(this.activeRestRequest?.header);
    },
    /**
     * AJout d'une nouvelle valeur
     * @param values
     */
    add: function(values?: RestRequestParameters[]) {
      if (values) {
        const last = maxBy(values, x => x.id);
        values.push({
          id: (last?.id ?? 0) + 1,
          entry: { key: '',  value: '', active: true }
        });
      }
    },
    deleteHeader(value: RestRequestParameters){
      this.delete(this.activeRestRequest?.header, value);
    },
    /**
     * Suppression d'un paramètre
     * @param value
     */
    deleteParameter(value: RestRequestParameters) {
      this.delete(this.activeRestRequest?.parameter, value);
    },
    /**
     * Supression d'une valeur
     * @param values
     * @param value
     */
    delete(values?: RestRequestParameters[], value?: RestRequestParameters) {
      if (value && values){
        const p = values.find(x => x.id == value.id);
        if (p){
          remove(values, x => x.id == p.id);
          let i = 0;
          for (const item of values){
            item.id = ++i;
          }
          this.onUpdate();
        }
      }
    },
    /**
     * Mie à jour de la requète active
     */
    onUpdate() {
      if (this.activeRestRequest){
        this.appState.updateSaveAttribute(this.activeRestRequest, false);
      }
    },
    /**
     * Suppression de tous les paramètres
     */
    deleteAllParameter() {
      if (this.activeRestRequest){
        this.activeRestRequest.parameter = [];
        this.onUpdate();
      }
    },
    deleteAllHeader(){
      if (this.activeRestRequest){
        this.activeRestRequest.header = [];
        this.onUpdate();
      }
    }
  },
});

</script>
<style lang="scss">
.rest-onglet-param {
  border-bottom: 1px solid;
  border-color: var(--q-panel-border);
}
</style>

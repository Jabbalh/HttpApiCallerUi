<template>
  <div class="request-url-input">
    <q-select
      v-model="activeRestRequest.method"
      borderless :options="REST_METHODS"
      dense
      class="select-method"
      dropdown-icon="expand_more"
      @update:modelValue="updateSaveAttribute(activeRestRequest)"/>
    <q-separator vertical inset />
    <q-field borderless dense class="input-url">
      <SingleLineInput
        class="q-mt-sm"
        :editable="true"
        v-model="activeRestRequest.url"
        @update:modelValue="updateSaveAttribute(activeRestRequest)"
      />
    </q-field>
  </div>
  <div class="request-url-action">
    <q-btn :label="i18n.t('REST.BUTTON_SEND')" color="accent" unelevated no-caps @click="sendRestRequest(activeRestRequest)" />
    <q-btn :label="i18n.t('REST.BUTTON_SAVE')" color="grey" outline class="q-ml-md" no-caps @click="saveRequest()"/>
  </div>
</template>

<script lang="ts">

import {defineComponent} from 'vue';
import {RestRequest} from 'src/models/model';
import {useI18n} from 'vue-i18n';
import { REST_METHODS } from 'src/models/Constantes';
import {useAppStore} from 'stores/appStore';
import {mapWritableState} from 'pinia';
import {pendingRequest, useSendHttpRequest} from 'src/composables/SendHttpRequest';
import SingleLineInput from "components/commun/SingleLineInput.vue";
import * as E from "fp-ts/Either";
import useRequestUtils from "src/composables/RequestUtils";

export default defineComponent({
  name:'RestHttpRequestUrl',
  components: {SingleLineInput},
  setup(){
    const i18n = useI18n();
    const { sendRequest } = useSendHttpRequest() ;
    const appStore = useAppStore();
    const { saveRequest } = useRequestUtils().useSaveRestRequest();
    const sendRestRequest = (value: RestRequest) => {
      value.response = pendingRequest();
      sendRequest(value).then(x => {
        // En cas d'erreur
        if (E.isLeft(x)){
          value.response = x.left;
        }
        // En cas de succès
        if (E.isRight(x)){
          console.log("x.Right", x.right);
          value.response = x.right
        }
      })
    };


    return {
      sendRestRequest,
      REST_METHODS,
      i18n,
      appStore,
      saveRequest
    }
  },
  methods: {
    updateSaveAttribute(request: RestRequest){
      this.appStore.updateSaveAttribute(request, false);
    }
  },
  computed: {
    ...mapWritableState(useAppStore, ['activeRestRequest'])
  }

})


</script>
<style lang="scss">
.request-url-input {
  border-radius: 5px;
  border: 1px solid grey;
  width: calc(100% - 208px);
  display: inline-flex;
  background-color: var(--q-panel-secondary);

  .select-method {
    margin-left: 16px;
    margin-right: 16px;
    min-width: 80px;
  }

  .input-separator {
    width: 5px;
  }

  .input-url {
    margin-left: 16px;
    width: calc(100% - 80px);
  }
}
.request-url-action {
  width: 208px;
  display: flex;
  justify-content: flex-end;
  button {
    padding-top: 0!important;
    padding-bottom: 0!important;
    height: 100%;
  }
}

</style>

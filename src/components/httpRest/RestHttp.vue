<template>
  <div style="display: flex" class="rest-http-onglets">
    <RestHttpOnglets />
    <q-btn round color="primary" icon="add" size="md" class="q-ml-md" flat @click="addRequest"/>
<!--    <q-icon name="add" size="md" class="q-mt-xs q-ml-md" />-->
  </div>
    <RestHttpContainer/>
</template>
<script lang="ts">
import  {defineComponent} from 'vue';
import RestHttpOnglets from 'components/httpRest/RestHttpOnglets.vue';
import RestHttpContainer from 'components/httpRest/RestHttpContainer.vue';
import {useAppStore} from 'stores/appStore';
import {useQuasar} from "quasar";
import {useI18n} from "vue-i18n";

export default defineComponent({
  name:'RestHttp',
  components: {RestHttpContainer, RestHttpOnglets },
  setup() {
    const appStore = useAppStore();
    const q$ = useQuasar();
    const i18n = useI18n();
    const addRequest = () => {
      q$.dialog({
        title:i18n.t('REST.ADD_REQUEST_TITLE'),
        prompt: {
         type:'text',
          model: '',
          outlined: true,
          label: i18n.t('REST.ADD_REQUEST_PLACEHOLDER')
        },
        cancel: true
      }).onOk((x: string) => {
        appStore.addRestRequest(x);
      })
    }

    return {
      addRequest
    }
  }

});

</script>

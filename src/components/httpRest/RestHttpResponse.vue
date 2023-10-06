<template>
  <div v-if="!loading">
    <div class="row wrap-word" v-if="response">
      <SmartJson v-model="response" :editable="false" />
    </div>
    <div v-else>
      Aucune réponse
    </div>
  </div>
  <div v-else>
    Chargement en cours .....
  </div>
</template>
<script lang="ts">
import {computed, defineComponent} from 'vue';
import SmartJson from '../commun/SmartJson.vue';
import {useAppStore} from "stores/appStore";

export default defineComponent({
  name:'RestHttpResponse',
  components: {SmartJson},
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  },
  setup(){
    const appStore = useAppStore();
    if (appStore.activeRestRequest && !appStore.activeRestRequest?.response){
      appStore.activeRestRequest.response.response = '';
    }

    const response = computed({
      get: () => {
        const r = appStore.activeRestRequest?.response.response ?? '';
        console.log('r', r);
        return r;
      },
      set: (value: string) => {
        if (appStore.activeRestRequest){
          appStore.activeRestRequest.response.response = value;
        }
      }
    });

    return {
      response
    }

  }
});

</script>


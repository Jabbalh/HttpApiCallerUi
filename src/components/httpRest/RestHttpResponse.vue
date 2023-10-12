<template>
  <div v-if="!loading">
<!--    running_with_errors-->
    <div class="row wrap-word" v-if="response">
      <AreaInput v-model="response" :editable="false" :singleLine="false" />
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
import AreaInput from '../commun/AreaInput.vue';
import {useAppStore} from 'stores/appStore';

export default defineComponent({
  name:'RestHttpResponse',
  components: { AreaInput },
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
        return appStore.activeRestRequest?.response.response ?? '';
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

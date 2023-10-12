<template>
  <div class="full-width ">
    <!--    running_with_errors-->
    <div class="row wrap-word" v-if="hasResponse">
      <AreaInput v-model="responseBody" :editable="false" :singleLine="false" />
    </div>
    <div v-if="isLoading">
      Chargement en cours .....
    </div>
    <div v-else class="q-mt-xl">
      <div class="flex items-center justify-center" style="flex-direction: column">
        <q-icon name="running_with_errors"
                style="font-size: 6rem; flex-direction: column; display: inline-flex"
                class="text-red-12"/>
        <span class="font-semibold text-center q-mt-md text-grey">
          Erreur lors de l'exécution de la requète ({{ statusCode }})
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {computed, defineComponent} from 'vue';
import AreaInput from '../commun/AreaInput.vue';
import {useAppStore} from 'stores/appStore';

export default defineComponent({
  name:'RestHttpResponse',
  components: { AreaInput },
  setup(){
    const appStore = useAppStore();
    const response = computed(() => appStore.activeRestRequest?.response);
    const responseBody = computed(() => appStore.activeRestRequest?.response.body ?? '');
    const hasResponse = computed(() => {
      if (response.value){
        return response.value?.type == 'success'
      }
      return false
    });

    const isLoading = computed(() => response.value?.type == 'loading');
    const statusCode = computed(() => response.value?.type == 'fail' ? response.value?.statusCode ?? 500 : 500)
    return {
      isLoading,
      statusCode,
      response,
      responseBody,
      hasResponse
    }

  }
});

</script>

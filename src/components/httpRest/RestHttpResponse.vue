<template>
  <div class="full-width " style="position: relative;height: 100%; overflow: hidden">
    <!--    running_with_errors-->
    <div class="" v-if="hasResponse" style="overflow: auto;height: 100%; ">
      <AreaInput
        v-model="responseBody"
        :editable="false"
        :language="language"
        placeholder=""/>

    </div>
    <div v-else-if="isLoading">
      <div class="flex items-center justify-center" style="flex-direction: column;">
        <q-circular-progress
          indeterminate
          rounded
          size="6rem"
          color="grey"
          class="q-ma-md"
        />
        <span class="font-semibold text-center q-mt-md text-grey">
            Chargement en cours
          </span>
      </div>
    </div>
    <div v-else-if="hasError" class="q-mt-xl" >
      <div class="flex items-center justify-center" style="flex-direction: column">
        <q-icon name="running_with_errors"
                style="font-size: 4rem; flex-direction: column; display: inline-flex"
                class="text-red-12"/>
        <span class="font-semibold text-center q-mt-md text-grey">
            Erreur lors de l'exécution de la requète ({{ statusCode }})
          </span>
      </div>
    </div>
    <div v-else>
      Aucunes données
    </div>
  </div>
</template>
<script lang="ts">
import {computed, defineComponent} from 'vue';
import AreaInput from '../commun/AreaInput.vue';
import {useAppStore} from 'stores/appStore';
import {LANGUAGE} from 'src/models/Constantes';
import {useTypeVerify} from "src/composables/TypeVerify";

export default defineComponent({
  name:'RestHttpResponse',
  components: { AreaInput },
  setup(){
    const appStore = useAppStore();
    const { hasStatusCode } = useTypeVerify();

    const response = computed(() => appStore.activeRestRequest?.response);
    const responseBody = computed(() => appStore.activeRestRequest?.response?.body ?? '');
    const hasResponse = computed(() => {
      if (response.value){
        return response.value?.type == 'success'
      }
      return false
    });
    const hasError = computed(() => response.value?.type == 'fail');
    const isLoading = computed(() => response.value?.type == 'loading');
    const statusCode = computed(() => hasStatusCode(response.value) ? response.value.statusCode : -1)

    const language = computed(() => {
      if (hasResponse.value) {
        console.log('response', response);
        return LANGUAGE.applicationJson
      } else {
        return '';
      }
    })

    return {
      isLoading,
      statusCode,
      response,
      responseBody,
      hasResponse,
      hasError,
      language
    }
  }
});

</script>

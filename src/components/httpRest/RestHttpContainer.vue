<template>
  <div v-if="activeRequest">
    <RestHttpRequestCollection v-if="mustDisplayCollection" />
    <RestHttpRequest v-else/>
  </div>
  <div v-else class="flex content-center justify-center" style="height: 60%;">
    <div class="label-color">
      <div class="row flex justify-center" style="font-size: 3.5rem">
        <q-icon name="o_cleaning_services" class="self-center"/>
      </div>
      <div class="row flex justify-center q-mt-md" style="font-size: 1.5rem">
        {{i18n.t('REST.NO_REQUEST')}}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {computed, defineComponent} from 'vue';
import RestHttpRequest from 'components/httpRest/RestHttpRequest.vue';
import useActiveRequest from 'src/composables/ActiveRequest';
import RestHttpRequestCollection from 'components/httpRest/RestHttpRequestCollection.vue';
import {useI18n} from "vue-i18n";
export default defineComponent({
  name:'RestHttpCollection',
  components: {RestHttpRequest, RestHttpRequestCollection},
  setup(){
    const { activeRequest } = useActiveRequest();
    const mustDisplayCollection = computed(() => {
      return !!(activeRequest?.value && 'isCollection' in activeRequest.value);
    })
    const i18n = useI18n();
    return {
      i18n,
      activeRequest,
      mustDisplayCollection
    }
  }
});

</script>

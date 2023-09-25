<template>
  <div>
    <HttpRequestCollection v-if="isCollection" />
    <RestHttpRequest v-if="!isCollection"/>
    <RestHttpResponse v-if="!isCollection"/>
  </div>
</template>
<script lang="ts">
import {computed, defineComponent} from 'vue';
import RestHttpResponse from 'components/httpRest/RestHttpResponse.vue';
import RestHttpRequest from 'components/httpRest/RestHttpRequest.vue';
import useActiveRequest from 'src/composables/ActiveRequest';
import HttpRequestCollection from "components/httpRest/HttpRequestCollection.vue";
export default defineComponent({
  name:'RestHttpContainer',
  components: {HttpRequestCollection, RestHttpRequest, RestHttpResponse},
  setup(){
    const { activeRequest } = useActiveRequest();
    const isCollection = computed(() => {
      return !!(activeRequest?.value && 'isCollection' in activeRequest.value);
    })
    return {
      activeRequest,
      isCollection
    }
  }

});

</script>

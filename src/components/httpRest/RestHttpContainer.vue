<template>
  <div v-if="activeRequest">
    <RestHttpRequestCollection v-if="mustDisplayCollection" />
    <RestHttpRequest v-else/>
  </div>
</template>
<script lang="ts">
import {computed, defineComponent} from 'vue';
import RestHttpRequest from 'components/httpRest/RestHttpRequest.vue';
import useActiveRequest from 'src/composables/ActiveRequest';
import RestHttpRequestCollection from 'components/httpRest/RestHttpRequestCollection.vue';
export default defineComponent({
  name:'RestHttpCollection',
  components: {RestHttpRequest, RestHttpRequestCollection},
  setup(){
    const { activeRequest } = useActiveRequest();
    const mustDisplayCollection = computed(() => {
      return !!(activeRequest?.value && 'isCollection' in activeRequest.value);
    })
    return {
      activeRequest,
      mustDisplayCollection
    }
  }
});

</script>

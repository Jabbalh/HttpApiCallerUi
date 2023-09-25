<template>
  <div v-if="activeRequest">
    <RestHttpCollection v-if="isCollection" />
    <RestHttpRequest v-if="!isCollection"/>
  </div>
</template>
<script lang="ts">
import {computed, defineComponent} from 'vue';
import RestHttpRequest from 'components/httpRest/RestHttpRequest.vue';
import useActiveRequest from 'src/composables/ActiveRequest';
import RestHttpCollection from "components/httpRest/RestHttpCollection.vue";
export default defineComponent({
  name:'RestHttpCollection',
  components: {RestHttpCollection, RestHttpRequest},
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

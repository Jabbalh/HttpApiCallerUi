<template>
  <div>
    <RestHttpUrl />
    <RestHttpRequest />
    <RestHttpResponse />
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import RestHttpUrl from 'components/httpRest/RestHttpUrl.vue';
import RestHttpResponse from 'components/httpRest/RestHttpResponse.vue';
import RestHttpRequest from 'components/httpRest/RestHttpRequest.vue';
export default defineComponent({
  name:'RestHttpContainer',
  components: {RestHttpRequest, RestHttpResponse, RestHttpUrl},

});

</script>

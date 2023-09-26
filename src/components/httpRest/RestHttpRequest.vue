<template>
  <div>
  <q-splitter
    style="height: calc(100vh - 135px);"
    v-model="splitterModel"
    unit="px"
    separator-class="splitter-separator-horizontal"
    horizontal
    before-class="panel-primary"
    after-class="panel-primary"
    >
    <template v-slot:before>
      <div class="row q-ma-md">
        <RestHttpRequestUrl v-model:loading="loading" />
      </div>
      <div class="row q-ma-md">
        <RestHttpRequestParam />
      </div>
    </template>
    <template v-slot:after>
      <div class="row q-ma-md">
        <RestHttpResponse :response="activeRequest?.response" :loading="loading" />
      </div>
    </template>
  </q-splitter>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';
import RestHttpRequestUrl from 'components/httpRest/RestHttpRequestUrl.vue';
import useActiveRequest from 'src/composables/ActiveRequest';
import RestHttpResponse from 'components/httpRest/RestHttpResponse.vue';
import RestHttpRequestParam from 'components/httpRest/RestHttpRequestParam.vue';
export default defineComponent({
  name:'RestHttpRequest',
  components: {RestHttpRequestParam, RestHttpResponse, RestHttpRequestUrl},
  setup(){
    return {
      loading: ref(false),
      splitterModel: ref(350),
      ...useActiveRequest()
    }
  }

});

</script>

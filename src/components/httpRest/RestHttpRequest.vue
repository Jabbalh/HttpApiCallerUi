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
        <div class="sticky-tabs top-0 z-index-22">
          <div class="row q-pa-md">
            <RestHttpRequestUrl />
          </div>
        </div>
        <div class="row q-pb-md request-container">
          <RestHttpRequestParam />
        </div>
      </template>
      <template v-slot:after>
        <div class="row q-ma-md">
          <RestHttpResponse />
        </div>
      </template>
    </q-splitter>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';
import RestHttpRequestUrl from 'components/httpRest/RestHttpRequestUrl.vue';
import RestHttpResponse from 'components/httpRest/RestHttpResponse.vue';
import RestHttpRequestParam from 'components/httpRest/RestHttpRequestParam.vue';
export default defineComponent({
  name:'RestHttpRequest',
  components: {RestHttpRequestParam, RestHttpResponse, RestHttpRequestUrl},
  setup(){
    return {
      splitterModel: ref(350)
    }
  }
});

</script>
<style lang="scss">
.request-container {
  width: 100%;
  height: calc(100% - 95px);
}
</style>

<template>
  <div class="row sticky-tabs sticky-status q-col-gutter-md q-pt-none q-pb-none full-width text-gray status-color"
       v-if="hasStatusCode(response)">
    <div>Status: <span :class="codeStatusClass">{{status}}</span> </div>
    <div>Time: <span class="text-positive">{{meta.responseDuration}}ms</span></div>
    <div>Weight: <span class="text-positive">{{responseSize}}</span></div>
  </div>
</template>
<script lang="ts" setup>
import {computed} from "vue";
import {useAppStore} from "stores/appStore";
import {useTypeVerify} from "src/composables/typeVerify";

const appStore = useAppStore();
const { hasStatusCode, hasMetaResponse } = useTypeVerify()
const response = computed(() => appStore.activeRestRequest?.response);
const status = computed(() => hasStatusCode(response.value) ? response.value.statusCode : -1)
const meta = computed(() => hasMetaResponse(response.value) ? response.value.meta : {
  responseDuration: 0,
  responseSize: 0
});

const responseSize = computed(() => {
  const size = meta.value.responseSize;
  if (size >= 100000) return (size / 1000000).toFixed(2) + " MB"
  if (size >= 1000) return (size / 1000).toFixed(2) + " KB"
  return size + 'B'
});

const codeStatusClass = computed(() => {
  if (status.value >= 200 && status.value <= 299){
    return 'text-positive'
  }
  return 'text-negative'
})


</script>
<style lang="scss">
.sticky-status {
  // height: 30px;
  // align-items: flex-end;
  position: sticky;
  z-index: 22;
  bottom: 0;
  padding-left:16px;
}

.status-color {
  color: grey;
  font-weight: bold;
}


</style>

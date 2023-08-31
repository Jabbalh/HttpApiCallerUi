<template>
  <q-splitter
    v-model="splitterSecondModel"
    horizontal
    separator-class="bg-splitter-sep splitter-sep-horizontal"
    :limits="[10,Infinity]"
    unit="%">
    <template v-slot:before>
      <div class="q-ma-md">
        <RestHttpRequest :http-request="httpRequest" />
      </div>
    </template>

    <template v-slot:after>
      <div class="q-ma-md">
        <RestHttpResponse />
      </div>
    </template>
  </q-splitter>

</template>
<script lang="ts">

import { defineComponent, ref } from 'vue';
import RestHttpRequest from "components/httpRest/RestHttpRequest.vue";
import RestHttpResponse from "components/httpRest/RestHttpResponse.vue";

export default defineComponent({
  name: 'RestHttpContainer',
  components: {RestHttpResponse, RestHttpRequest},
  props: {
    httpRequest: Object
  },
  setup(){
    return {
      splitterSecondModel: ref(50),
    }
  }

})

</script>

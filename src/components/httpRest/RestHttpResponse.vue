<template>
  <div v-if="!loading">
    <div class="row wrap-word" v-if="response">
      {{response}}
    </div>
    <div v-else>
      Aucune réponse
    </div>
  </div>
  <div v-else>
    Chargement en cours .....
  </div>
</template>
<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {RestResponse} from "src/models/model";
export default defineComponent({
  name:'RestHttpResponse',
  props: {
    response: {
      type: Object as PropType<RestResponse>
    },
    loading: {
      type: Boolean,
      required: true
    }
  }

});

</script>


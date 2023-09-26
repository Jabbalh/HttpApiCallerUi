<template>
  <div class="rest-http-header" >
    <div class="rest-http-wrapper">
      <RestHttpOnglets />
    </div>
    <div class="rest-http-onglet-env ">
      <q-select borderless :options="['DEV', 'PROD']" v-model="envModel" dense dropdown-icon="expand_more" class="select" />
    </div>
  </div>
    <RestHttpContainer/>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';
import RestHttpOnglets from 'components/httpRest/RestHttpOnglets.vue';
import RestHttpContainer from 'components/httpRest/RestHttpContainer.vue';

export default defineComponent({
  name:'RestHttp',
  components: {RestHttpContainer, RestHttpOnglets },
  setup(){
    return {
      envModel: ref('')
    }
  }
});

</script>

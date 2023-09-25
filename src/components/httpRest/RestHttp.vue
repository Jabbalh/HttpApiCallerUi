<template>
  <div style="display: flex" class="rest-http-onglets">
    <RestHttpOnglets />
    <q-btn round color="primary" icon="add" size="md" class="q-ml-md" flat @click="addRequest"/>
<!--    <q-icon name="add" size="md" class="q-mt-xs q-ml-md" />-->
  </div>
    <RestHttpContainer/>
</template>
<script lang="ts">
import  {defineComponent} from 'vue';
import RestHttpOnglets from 'components/httpRest/RestHttpOnglets.vue';
import RestHttpContainer from 'components/httpRest/RestHttpContainer.vue';
import useRequestUtils from 'src/composables/RequestUtils';

export default defineComponent({
  name:'RestHttp',
  components: {RestHttpContainer, RestHttpOnglets },
  setup() {
    return {
      ...useRequestUtils()
    }
  }

});

</script>

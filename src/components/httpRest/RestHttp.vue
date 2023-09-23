<template>
  <div style="display: flex">
    <RestHttpOnglets />
    <q-btn round color="primary" icon="add" size="md" class="q-ml-md" flat/>
<!--    <q-icon name="add" size="md" class="q-mt-xs q-ml-md" />-->
  </div>
    <RestHttpContainer />
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import RestHttpOnglets from 'components/httpRest/RestHttpOnglets.vue';
import RestHttpContainer from 'components/httpRest/RestHttpContainer.vue';
export default defineComponent({
  name:'RestHttp',
  components: {RestHttpContainer, RestHttpOnglets },

});

</script>

<template>
    <RestHttpOnglets />
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

<template>
  <q-page class="">
    <RestSidebare  />

  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RestSidebare from 'components/httpRest/RestSidebar.vue';


export default defineComponent({
  name: 'RestPage',
  components: {RestSidebare},
  setup () {

    return {
    };
  }
});
</script>

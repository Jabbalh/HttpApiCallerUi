<template>
  <q-page class="">
    <HttpRest class="full-height-page full-width-page"/>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import HttpRest from 'components/httpRest/RestHttp.vue';


export default defineComponent({
  name: 'RestPage',
  components: {HttpRest },
  setup () {

    return {
      selectedMainTab: ref('http')
    };
  }
});
</script>

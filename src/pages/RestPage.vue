<template>
  <q-page class="" >
    <RestSidebare  />

  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RestSidebare from 'components/httpRest/RestSidebar.vue';
import useRequestUtils from 'src/composables/RequestUtils';

export default defineComponent({
  name: 'RestPage',
  components: {RestSidebare},
  setup () {
    const { saveRequest } = useRequestUtils().useSaveRestRequest();

    // Evènement sur le ctrl+S
    document.onkeydown = function(evt) {
      //evt = evt || window.event;
      if (evt.ctrlKey && evt.code == 'KeyS') {
        evt.preventDefault();
        saveRequest()
      }
    };
    return {

    };
  }
});
</script>

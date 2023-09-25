<template>
  <q-page class="" >
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
    const saveRequest = () => console.log("save request");
    // Evènement sur le ctrl+S
    document.onkeydown = function(evt) {
      evt = evt || window.event;
      if (evt.ctrlKey && evt.keyCode == 83) {
        evt.preventDefault();
        saveRequest()
      }
    };
    return {

    };
  }
});
</script>

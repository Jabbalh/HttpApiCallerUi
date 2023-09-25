<template>
  HttpCollection
</template>
<script lang="ts">

import { defineComponent} from 'vue';
import useActiveRequest from 'src/composables/ActiveRequest';

export default defineComponent({
  name:"HttpRequestCollection",
  setup(){
    return {
      ...useActiveRequest()
    }
  }
})

</script>

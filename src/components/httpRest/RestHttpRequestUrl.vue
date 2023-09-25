<template>
  {{activeRequest}}
</template>

<script lang="ts">

import {defineComponent} from 'vue';
import useActiveRequest from 'src/composables/ActiveRequest';

export default defineComponent({
  name:'RestHttpRequestUrl',
  setup(){
    return {
      ...useActiveRequest()
    }
  }

})

</script>

<template>
  <environement-list />
</template>
<script lang='ts'>
import {defineComponent} from 'vue';
import EnvironementList from '../environement/EnvironementList.vue';

export default defineComponent({
  components: { EnvironementList },
  name: 'RestEnvironnement',
  setup(){
    return {

    }
  }
});

</script>

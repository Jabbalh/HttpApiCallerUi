<template>
  <div class="row">
    <div class="col-12" v-for="(item, index) of collections" :key="index" @click="open(item)">
      {{item.name}}
    </div>
  </div>

</template>
<script lang='ts'>
import {computed, defineComponent} from 'vue';
import {useAppStore} from "stores/appStore";
import {RestRequest} from "src/models/model";

export default defineComponent({
  name: 'RestCollection',
  setup(){
    const appStore = useAppStore();
    const collections = computed(() => appStore.currentRestCollection?.requests ?? [] );
    const open = (x: RestRequest) => {
      x.isOpen = true;
      appStore.$patch({
        activeRestRequest: x.id
      })
    };
    return {
      collections,
      open
    }
  }
});

</script>

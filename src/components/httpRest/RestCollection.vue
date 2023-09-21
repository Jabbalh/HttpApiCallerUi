<template>
  <div class="row">
    <q-tree
      :nodes="collections"
      v-model:selected="selectedKey"
      node-key="id"
      label-key="name"
      children-key="requests"
      @update:selected="openItem"
      selected-color="primary"
      default-expand-all
      />
<!--    <div class="col-12" v-for="(item, index) of collections" :key="index" @click="open(item)">-->
<!--      {{item.name}}-->
<!--    </div>-->
  </div>

</template>
<script lang='ts'>
import {computed, defineComponent, ref} from 'vue';
import {useAppStore} from "stores/appStore";
import {RestCollection, RestRequest} from "src/models/model";

export default defineComponent({
  name: 'RestCollection',
  setup(){
    const appStore = useAppStore();
    const collections = computed<RestCollection[]>(() => appStore.restCollection );
    const open = (x: RestRequest) => {
      x.isOpen = true;
      appStore.$patch({
        activeRestRequest: x.id
      })
    };
    const openItem = (x:any) => {
      console.log("openItem", x);

      for (const item of collections.value){
        console.log("item", item);

      }

    }

    const selectedKey = ref("");

    return {
      collections,
      selectedKey,
      open,
      openItem
    }
  }
});

</script>

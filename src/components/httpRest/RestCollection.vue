<template>
  <div class="row">
    <q-tree
      :nodes="collections"
      v-model:selected="selectedKey"
      node-key="id"
      label-key="name"
      children-key="requests"
      selected-color="accent"
      default-expand-all
      >
      <template v-slot:default-header="prop" >
        <div @click="openItem(prop.node)">
          {{prop.node.name}}
        </div>

      </template>
    </q-tree>

  </div>

</template>
<script lang='ts'>
import {computed, defineComponent, ref} from 'vue';
import {useAppStore} from 'stores/appStore';
import {RestCollection, RestRequest} from 'src/models/model';

export default defineComponent({
  name: 'RestCollection',
  setup(){
    const appStore = useAppStore();
    const collections = computed<RestCollection[]>(() => appStore.restCollection );
    const openItem = (x: RestRequest) => {
      x.isOpen = true;
      appStore.openRequest(x);
      // appStore.$patch({
      //   activeRestRequest: x.id
      // })
    };

    const selectedKey = computed({
      get: () => appStore.activeRestRequest,
      set: (value: string) => console.log("selectedKey")
    });

    return {
      collections,
      selectedKey,
      open,
      openItem
    }
  }
});

</script>

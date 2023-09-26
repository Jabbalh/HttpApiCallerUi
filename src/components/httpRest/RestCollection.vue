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
      class="rest-collection-tree"
      >
      <template v-slot:default-header="prop" >
        <div @click="openItem(prop.node)" class="rest-collection-tree-node wrap-word">
          {{prop.node.name}}
        </div>
        <q-icon name="more_vert" class="rest-collection-tree-node-menu" @click="openNodeMenu">
          <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
            <component
              :is="isCollection(prop.node) ? 'PopinMenuDirectory' : 'PopinMenuRequest'"
              v-model="prop.node"/>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-tree>

  </div>

</template>
<script lang='ts'>
import {computed, defineComponent} from 'vue';
import {useAppStore} from 'stores/appStore';
import {RestCollection, RestRequest} from 'src/models/model';
import { isCollection } from 'src/composables/ActiveRequest';
import PopinMenuDirectory from 'components/httpRest/PopinMenuDirectory.vue';
import PopinMenuRequest from 'components/httpRest/PopinMenuRequest.vue';

export default defineComponent({
  name: 'RestCollection',
  components: { PopinMenuDirectory, PopinMenuRequest },
  setup(){
    console.log('RestCollection')
    const appStore = useAppStore();
    const collections = computed<RestCollection[]>(() => appStore.restCollection );
    const openItem = (x: RestRequest) => {
      x.isOpen = true;
      appStore.openRequest(x);
    };

    const selectedKey = computed({
      get: () => appStore.activeRestRequest?.id ?? '',
      set: (_value: string) => console.log('selectedKey', _value)
    });

    const openNodeMenu = () => console.log('open menu node');

    return {
      collections,
      selectedKey,
      open,
      openItem,
      openNodeMenu,
      isCollection
    }
  }
});

</script>
<style lang="scss">
  .rest-collection-tree {
    width: 100%;

    .rest-collection-tree-node{
      width: 90%;
    }
    .rest-collection-tree-node-menu{
      float: right;
      z-index: 99;
    }
  }
</style>

<template>
<!--  <SmartTreeViewRoot :collection="collections" />-->
  <div class="row">
    <q-tree
      :nodes="collections"
      v-model:selected="selectedKey"
      node-key="id"
      label-key="name"
      children-key="children"
      selected-color="accent"
      default-expand-all
      class="rest-collection-tree"
      >
      <template v-slot:default-header="prop" >
        <SmartTreeBody :node="prop.node" />
      </template>
    </q-tree>

  </div>

</template>
<script lang='ts'>
import {computed, defineComponent} from 'vue';
import {useAppStore} from 'stores/appStore';
import useTreeViewCollection from 'src/composables/treeViewCollection';
import SmartTreeBody from 'components/commun/TreeView/SmartTreeBody.vue';

export default defineComponent({
  name: 'RestCollection',
  components: {SmartTreeBody },
  setup(){
    const appStore = useAppStore();
    const {transform} = useTreeViewCollection();

    const collections = computed(() => transform(appStore.restCollection) );

    const selectedKey = computed({
      get: () => appStore.activeRestRequest?.id ?? '',
      set: (_value: string) => console.log('selectedKey', _value)
    });

    return {
      collections,
      selectedKey
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
      z-index: 1;
    }
  }
</style>

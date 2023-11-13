<template>
  <div  class="rest-collection-tree-node wrap-word" @click="openItem(node)">
    <span class="rest-method q-pr-sm" :class="node.method" v-if="isRestRequest(node)">{{node.method}}</span>
    <span>{{node.name}}</span>
  </div>
  <q-icon name="more_vert" class="rest-collection-tree-node-menu" >
    <q-popup-proxy >
      <PopinMenuDirectory :data="node" v-if="isRestCollection(node)" @updateNode="updateNode" />
      <PopinMenuRequest :data="node" v-else @updateNode="updateNode"/>
    </q-popup-proxy>
  </q-icon>

</template>
<script lang="ts" setup>
  import {CollectionTreeView} from 'src/composables/treeViewCollection';
  import {useTypeVerify} from 'src/composables/TypeVerify';
  import {IRestCollection, RestRequest} from 'src/models/model';
  import {useAppStore} from 'stores/appStore';
  import {defineComponent} from 'vue';
  import PopinMenuDirectory from 'components/httpRest/PopinMenuDirectory.vue';
  import PopinMenuRequest from 'components/httpRest/PopinMenuRequest.vue';

  defineComponent({PopinMenuDirectory, PopinMenuRequest});
  defineProps<{ node: CollectionTreeView }>();
  const appStore = useAppStore();
  const {isRestRequest, isRestCollection} = useTypeVerify();

  const openItem = (x: RestRequest | IRestCollection) => {
    x.isOpen = true;
    appStore.openRequest(x);
  };

  const updateNode = (value: {id: string, name: string}) => {
    const req = appStore.openedRestRequest.find(x => x.id == value.id);
    if (req){
      req.name = value.name;
    }
  }


</script>

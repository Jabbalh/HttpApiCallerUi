<template>
  <div  class="rest-collection-tree-node wrap-word" @click="openItem(node)">
    <span class="rest-method q-pr-sm" :class="node.method" v-if="isRestRequest(node)">{{node.method}}</span>
    <span>{{node.name}}</span>
  </div>
  <q-icon name="more_vert" class="rest-collection-tree-node-menu" >
    <q-popup-proxy v-model="openMenu">
      <PopinMenuDirectory
          :data="node"
          v-if="isRestCollection(node)"
          @updateNode="updateNode"
          @onClickAction="onClickAction"/>
      <PopinMenuRequest
          v-else
          :data="node"
          @updateNode="updateNode"/>
    </q-popup-proxy>
  </q-icon>
</template>
<script lang="ts" setup>
  import {CollectionTreeView} from 'src/composables/treeViewCollection';
  import {useTypeVerify} from 'src/composables/TypeVerify';
  import {IRestCollection, RestRequest} from 'src/models/model';
  import {useAppStore} from 'stores/appStore';
  import {defineComponent, ref} from 'vue';
  import PopinMenuDirectory from 'components/httpRest/PopinMenuDirectory.vue';
  import PopinMenuRequest from 'components/httpRest/PopinMenuRequest.vue';

  defineComponent({PopinMenuDirectory, PopinMenuRequest});
  defineProps<{ node: CollectionTreeView }>();
  const appStore = useAppStore();
  const {isRestRequest, isRestCollection} = useTypeVerify();
  const openMenu = ref(false);
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

  const onClickAction = () => openMenu.value = false;
</script>

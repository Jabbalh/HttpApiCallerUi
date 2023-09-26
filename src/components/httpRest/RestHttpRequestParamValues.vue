<template>
  <div class="row rest-parameter-container" >
    <div class="rest-parametre-titre">Paramètres de la requète</div>
    <div class="rest-parametre-width-icon">
      <span class="material-icons cursor-pointer rest-parameter-icon" @click="addParameter">add</span>
      <span class="material-icons cursor-pointer rest-parameter-icon" @click="deleteAllParameter">delete</span>
    </div>
  </div>
  <draggable
    v-model="workingParams"
    item-key="id"
    animation="250"
    handle=".draggable-handle"
    draggable=".draggable-content"
    ghost-class="cursor-move"
    chosen-class="bg-shadow-panel"
    drag-class="cursor-grabbing"
  >
    <template #item="{ element: { entry } }">
      <div class="row rest-parameter-container draggable-content">
        <div class="rest-parameter-drag draggable-handle">
          <span class="material-icons rest-parameter-icon cursor-drag">menu</span>
        </div>
        <div class="rest-parameter-key-value">
          <!--      <input type="text" style="width: 100%;height: 100%; border: none" />-->
          {{entry.key}}
        </div>
        <div class="rest-parameter-key-value">
          {{entry.value}}
        </div>
        <div class="rest-parametre-width-icon">
          <span class="material-icons cursor-pointer rest-parameter-icon" @click="addParameter">add</span>
          <span class="material-icons cursor-pointer rest-parameter-icon" @click="deleteAllParameter">delete</span>
        </div>
      </div>
    </template>
  </draggable>

</template>

<script lang="ts" setup>
  import {ref} from "vue";
  import draggable from "vuedraggable-es"

  const addParameter = () => console.log('Ajout parametre');
  const deleteAllParameter = () => console.log('Supprimr tous les paramètres');



  const workingParams = ref([
    {id: 1, entry: {key: 'key 1', value: 'value 1'} },
    {id: 2, entry: {key: 'key 2', value: 'value 2'} },
    {id: 3, entry: {key: 'key 3', value: 'value 3'} },
  ])

</script>
<style lang="scss">
  .rest-parameter-container {
    background-color: transparent;
    font-size: 0.8rem;
    border-bottom: 1px solid;
    border-bottom-color: $panel-border-light;
    margin-bottom: 8px;
    margin-top: 8px;
    padding-bottom: 6px;
  }
  .rest-parameter-icon {
    font-size: 1.2rem;
    padding: 0 5px 0 5px;
  }

  .rest-parametre-titre {
    width: calc(100% - 64px);
  }
  .rest-parameter-drag {
    width: 30px;
  }
  .rest-parameter-key-value {
    width: calc(50% - 32px - 15px);
  }

  .rest-parametre-width-icon {
    width: 64px;
  }


</style>

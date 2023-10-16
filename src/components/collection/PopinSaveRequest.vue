<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" >
    <q-card class="q-dialog-plugin" style="height: 500px; width: 500px">
      <q-card-section>
        Liste des collections
      </q-card-section>
      <q-card-section>
        <q-tree
          :nodes="directories"
          v-model:selected="selectedKey"
          node-key="id"
          label-key="name"
          children-key="requests"
          selected-color="accent"
          default-expand-all
          class="rest-collection-tree"
        >
          <template v-slot:default-header="prop" >
            <div class="rest-collection-tree-node wrap-word">
              {{prop.node.name}}
            </div>
            <q-icon name="more_vert" class="rest-collection-tree-node-menu" >
              <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
                <component
                  :is="isCollection(prop.node) ? 'PopinMenuDirectory' : 'PopinMenuRequest'"
                  v-model="prop.node"/>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-tree>
      </q-card-section>
      <q-card-actions>
        <q-btn label="Fermer" v-close-popup />
        <q-btn label="Sauvegarder" @click="onSave" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { useDialogPluginComponent } from 'quasar'
import { RestCollection } from "src/models/model";
import {ref} from "vue";
import {isCollection} from "src/composables/ActiveRequest";

const props = defineProps<{collection: RestCollection[]}>();

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits
]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
function onOKClick (value: string) {
  // on OK, it is REQUIRED to
  // call onDialogOK (with optional payload)
  onDialogOK(value)
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}

const selectedKey = ref('');

const addChild = (values: RestCollection[]): RestCollection[] => {
  return values.map(x => {
    return {
      id: x.id,
      name: x.name,
      childs: addChild(x.childs),
      requests: [],
      isLocal: true,
      isSaved: true,
      isCollection: true
    }
  })
}

const directories = props.collection.map(x => {
  const result: RestCollection = {
    id: x.id,
    name: x.name,
    childs: addChild(x.childs),
    requests: [],
    isLocal: true,
    isSaved: true,
    isCollection: true
  }
  return result;
});

const onSave = () => {
  onOKClick(selectedKey.value);
}

</script>

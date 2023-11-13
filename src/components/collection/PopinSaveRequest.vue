<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" >
    <q-card class="q-dialog-plugin popin-save">
      <q-card-section class="popin-save-title">
        {{i18n$.t('REST.POPIN_SAVE_REQUEST_TITLE')}}
      </q-card-section>
      <q-separator />
      <q-card-section class="">
        <div style="width: 100%">
          <q-input v-model="requestName" outlined dense :label="i18n$.t('REST.ADD_REQUEST_PLACEHOLDER')"/>
        </div>
      </q-card-section>
      <q-card-section class="popin-save-container">
        <q-tree
          :nodes="directories"
          v-model:selected="selectedKey"
          node-key="id"
          label-key="name"
          children-key="nodes"
          selected-color="accent"
          default-expand-all
          class=""
        >
          <template v-slot:default-header="prop" >
            <div class="rest-collection-tree-node wrap-word">
              {{prop.node.name}}
            </div>
          </template>
        </q-tree>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right" class="popin-save-actions">
        <q-btn :label="i18n$.t('REST.BUTTON_CANCEL')" v-close-popup class="bg-cancel text-cancel bouton"/>
        <q-btn :label="i18n$.t('REST.BUTTON_SAVE')" @click="onSave" color="accent" class="bouton"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { useDialogPluginComponent } from 'quasar'
import {IRestCollection, RestRequest} from 'src/models/model';
import {ref} from 'vue';
import {useI18n} from 'vue-i18n';
import RestCollection from 'src/models/RestCollection';

const props = defineProps<{
  collection: IRestCollection[],
  request: RestRequest
}>();

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits
]);
const requestName = ref(props.request.name);
const i18n$ = useI18n();
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
function onOKClick (value: string, name: string) {
  // on OK, it is REQUIRED to
  // call onDialogOK (with optional payload)
  onDialogOK({id: value, name: name});
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}

const selectedKey = ref('');

const addChild = (values: IRestCollection[]): IRestCollection[] => {
  return values.map(x => new RestCollection({
      id: x.id,
      name: x.name,
      childs: addChild(x.childs),
      requests: [],
      isLocal: true,
      isSaved: true,
      isCollection: true,
      isOpen: true,
      isActive: true
  }));
}

const directories = props.collection.map(x => {
  return new RestCollection({
    id: x.id,
    name: x.name,
    childs: addChild(x.childs),
    requests: [],
    isLocal: true,
    isSaved: true,
    isCollection: true,
    isOpen: false,
    isActive: false
  });
});

const onSave = () => {
  onOKClick(selectedKey.value, requestName.value);
}

</script>

<style lang="scss">
.popin-save {
  height: 80vh;
  width: 60vw;
}

.popin-save-title {
  height: 50px;
  font-size: 1.1rem;
  font-weight: bold;
  background-color: var(panel-secondary);
}

.popin-save-container {
  height: calc(80vh - 180px);
}

.popin-save-actions {
  height: 50px;
  .bouton {
    width: 150px;
    height: 35px;
  }
}

</style>

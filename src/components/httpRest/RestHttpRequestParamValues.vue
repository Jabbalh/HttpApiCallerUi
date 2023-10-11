<template>
  <div style="position: relative;">
    <div class="row rest-parameter-title sticky-tabs top-tertiary" >
      <div class="rest-parametre-titre">{{ libelleTitle }}</div>
      <div class="rest-parametre-width-icon">
        <span class="material-icons cursor-pointer rest-parameter-icon text-primary" @click="addParameter">add</span>
        <span class="material-icons cursor-pointer rest-parameter-icon text-negative" @click="deleteAllParameter">delete</span>
      </div>
    </div>
    <draggable
      style="overflow: auto; "
      v-model="workingParams"
      item-key="id"
      animation="250"
      handle=".draggable-handle"
      draggable=".draggable-content"
      ghost-class="cursor-move"
      chosen-class="bg-shadow-panel"
      drag-class="cursor-grabbing"
    >
      <template #item="{ element }">
        <div class="row rest-parameter-container draggable-content">
          <div class="rest-parameter-drag draggable-handle">
            <span class="material-icons rest-parameter-icon cursor-drag">menu</span>
          </div>
          <div class="rest-parameter-key-value">
            <SingleLineInput
              v-model="element.entry.key"
              @update:modelValue="onUpdate"
              :place-holder="libelleKey(element)"
              :suggestion-source="baseHeaders"
              :editable="true" />
          </div>
          <div class="rest-parameter-key-value">
            <SingleLineInput
              v-model="element.entry.value"
              @update:modelValue="onUpdate"
              :place-holder="libelleValue(element)"
              :editable="true" />
          </div>
          <div class="rest-parametre-width-icon">
            <span
              class="material-icons cursor-pointer rest-parameter-icon"
              @click="toogleActive(element.entry)"
              :class="element.entry.active ? 'text-positive' : 'text-negative'"
            >
              {{activeBouton(element.entry.active)}}
            </span>
            <span class="material-icons cursor-pointer rest-parameter-icon text-negative" @click="deleteParameter(element)">
              delete
            </span>
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import draggable from 'vuedraggable-es'
import SingleLineInput from 'components/commun/SingleLineInput.vue';
import {useI18n} from "vue-i18n";
import {RestRequestParameters} from "src/models/model";
import {commonHeaders} from 'src/models/HeaderConstantes';

const props = defineProps<{ modelValue: RestRequestParameters[], isHeader: boolean  }>();
const emit = defineEmits(['update:modelValue', 'add', 'delete', 'deleteAll', 'updateRequest']);

const workingParams = computed(() => props.modelValue);
const i18n = useI18n();

const libelleTitle = computed(() => props.isHeader ? i18n.t('REST.PARAM_REQ_HEADER_TITLE') : i18n.t('REST.PARAM_REQ_PARAM_TITLE'));
const libelleKey = (value: RestRequestParameters) => `${i18n.t('REST.PARAM_REQ_PARAM_KEY')} ${value.id}`;
const libelleValue = (value: RestRequestParameters) => `${i18n.t('REST.PARAM_REQ_PARAM_VALUE')} ${value.id}`;

const baseHeaders = props.isHeader ? commonHeaders : undefined;
/**
 * Ajout d'un paramètre
 */
const addParameter = () => {
  // const last = maxBy(workingParams.value, x => x.id);
  // workingParams.value?.push({
  //   id: (last?.id ?? 0) + 1,
  //   entry: { key: '',  value: '', active: true }
  // });
  emit('add');
};

const deleteParameter = (value: RestRequestParameters) => {
  // if (workingParams.value){
  //   const p = workingParams.value?.find(x => x.id == value.id);
  //   if (p){
  //     remove(workingParams.value, x => x.id == p.id);
  //     let i = 0;
  //     for (const item of workingParams.value){
  //       item.id = ++i;
  //     }
  //     onUpdate();
  //   }
  // }
  emit('delete', value);
}

const onUpdate = () => {
  // if (appState.activeRestRequest){
  //   appState.updateSaveAttribute(appState.activeRestRequest, false);
  // }
  emit('updateRequest');
}

const deleteAllParameter = () => {
  // if (appState.activeRestRequest){
  //   appState.activeRestRequest.parameter = [];
  //   onUpdate();
  // }
  emit('deleteAll');
}

const activeBouton = (value: boolean) => value ? 'radio_button_checked' : 'radio_button_unchecked';
const toogleActive = (value: {active: boolean}) => value.active = !value.active;

</script>
<style lang="scss">
.rest-parameter-title {
  padding-left: 16px;
  margin-bottom: 8px;
  color:$color-secondary;
  font-size: 12px;
  font-weight: 600;
}
.rest-parameter-container {
  background-color: transparent;
  font-size: 0.8rem;
  border-right: 1px solid;
  border-right-color: var(--q-panel-border);
  border-left: 1px solid;
  border-left-color: var(--q-panel-border);
  border-top: 1px solid;
  border-top-color: var(--q-panel-border);
  &:nth-last-child(1) {
    border-bottom: 1px solid;
    border-bottom-color: var(--q-panel-border);
  }
  padding-bottom: 6px;
  padding-top: 6px;
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
  border-left: 1px solid;
  border-right: 1px solid;
  border-color: var(--q-panel-border);
}

.rest-parametre-width-icon {
  width: 64px;
}


</style>

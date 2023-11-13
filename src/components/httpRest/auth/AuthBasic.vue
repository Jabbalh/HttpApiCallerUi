<template>
  <div class="row">
    <div class="col-12 border-top" >
      <SingleLineInput v-model="dataModel.key"
                       placeholder="Nom d'utilisateur"
                       :editable="true"
                        class="q-mt-xs ligne-param"/>
    </div>
    <div class="col-12 border-top border-bottom " >
      <SingleLineInput v-model="dataModel.value"
                        placeholder="Mot de passe"
                        class="q-mt-xs ligne-param"/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {RestRequestAuth} from "src/models/model";
import {useVModel} from "@vueuse/core/index";
import SingleLineInput from "components/commun/SingleLineInput.vue";

const props = defineProps<{ modelValue: RestRequestAuth }>();
const emit = defineEmits(['update:modelValue']);
const dataModel = useVModel(props, 'modelValue', emit);

</script>
<style lang="scss" scoped>
  .ligne-param {
    height: 30px;
  }

  .border-top {
    border-top: 1px solid;
    border-color: var(--q-panel-border);
  }

  .border-bottom {
    border-bottom: 1px solid;
    border-color: var(--q-panel-border);
  }
</style>

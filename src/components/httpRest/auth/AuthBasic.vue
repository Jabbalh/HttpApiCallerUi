<template>
  <div class="row">
    <div class="col-12 border-top" >
      <SingleLineInput v-model="dataModel.key"
                       :placeholder="i18n.t('REST.AUTH_BASIC_USERNAME')"
                       :editable="true"
                       @update:modelValue="emit('updateRequest')"
                        class="q-mt-xs ligne-param"/>
    </div>
    <div class="col-12 border-top border-bottom " >
      <SingleLineInput v-model="dataModel.value"
                       :placeholder="i18n.t('REST.AUTH_BASIC_PASSWORD')"
                       @update:modelValue="emit('updateRequest')"
                        class="q-mt-xs ligne-param"/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {RestRequestAuth} from 'src/models/model';
import {useVModel} from '@vueuse/core/index';
import SingleLineInput from 'components/commun/SingleLineInput.vue';
import {useI18n} from 'vue-i18n';

const props = defineProps<{ modelValue: RestRequestAuth }>();
const emit = defineEmits(['update:modelValue', 'updateRequest']);
const dataModel = useVModel(props, 'modelValue', emit);

const i18n = useI18n();

</script>
<style lang="scss" scoped>
  .ligne-param {
    height: 30px;
  }

  .border-top {
    border-top: 1px solid;
    border-left: 1px solid;
    border-right: 1px solid;
    border-color: var(--q-panel-border);
  }

  .border-bottom {
    border-bottom: 1px solid;
    border-color: var(--q-panel-border);
  }
</style>

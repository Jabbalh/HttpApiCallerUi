<template>
  <div class="row">
    <div class="col-12 border-top" >
      <SingleLineInput v-model="dataModel.key"
                       :placeholder="i18n.t('REST.AUTH_APIKEY_KEY')"
                       :editable="true"
                       @update:modelValue="emit('updateRequest')"
                       class="q-mt-xs ligne-param"/>
    </div>
    <div class="col-12 border-top " >
      <SingleLineInput v-model="dataModel.value"
                       :placeholder="i18n.t('REST.AUTH_APIKEY_VALUE')"
                       @update:modelValue="emit('updateRequest')"
                       class="q-mt-xs ligne-param"/>
    </div>
    <div class="col-12 border-top border-bottom" >
      <div style="display: inline-flex; align-content: center;flex-wrap: wrap" class="ligne-param">
        <div style="align-self: center;margin-left: 6px" class="label-color">Pass by</div>
        <div class="rest-http-body-select">
        <q-select
            class="q-ml-md select input-box"
            dropdown-icon="expand_more"
            borderless
            :options="options"
            v-model="dataModel.passBy"
            @update:modelValue="emit('updateRequest')"
            dense/>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {RestRequestAuth} from 'src/models/model';
import {useVModel} from '@vueuse/core/index';
import SingleLineInput from 'components/commun/SingleLineInput.vue';
import {useI18n} from 'vue-i18n';
import {API_KEY_HEADERS, API_KEY_QUERY_PARAMS} from 'src/models/Constantes';

const props = defineProps<{ modelValue: RestRequestAuth }>();
const emit = defineEmits(['update:modelValue']);
const dataModel = useVModel(props, 'modelValue', emit);

const i18n = useI18n();

const options = [API_KEY_HEADERS, API_KEY_QUERY_PARAMS];


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

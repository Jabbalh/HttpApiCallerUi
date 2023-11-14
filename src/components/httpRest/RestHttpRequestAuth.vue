<template>
  <div style="position: relative;height: 100%; overflow: hidden">
    <div class="row rest-parameter-title sticky-tabs top-tertiary " style="">
      <div class="rest-body-title" >
        {{i18n.t('REST.PARAM_AUTH_TITLE')}}
      </div>
      <div class="rest-http-body-select" v-if="dataModel">
        <q-select
          :options="OPTIONS_AUTH"
          v-model="dataModel.type"
          @update:modelValue="onUpdate"
          outlined
          dense
          emit-value
          map-options
          hide-bottom-space
          item-aligned
          dropdown-icon="expand_more"
          class="select input-box q-pa-none"/>
      </div>
    </div>
    <div style="overflow: auto;height: calc(100% - 50px); ">
      <div >
        <component :is="authComponent" v-model="dataModel" @updateRequest="emit('updateRequest')" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {useI18n} from 'vue-i18n';
import {KEY_AUTH, OPTIONS_AUTH} from 'src/models/Constantes';
import {useVModel} from '@vueuse/core/index';
import {RestRequestAuth} from 'src/models/model';
import {defaultAuth} from 'src/helpers/DefaultTypeUtils';
import {computed, defineComponent} from 'vue';
import AuthBasic from './auth/AuthBasic.vue';
import AuthApiKey from './auth/AuthApiKey.vue';
import AuthBearer from './auth/AuthBearer.vue';
import AuthNone from './auth/AuthNone.vue';
import AuthOauth from './auth/AuthOauth.vue';

defineComponent({AuthBasic, AuthApiKey, AuthBearer, AuthNone, AuthOauth})
const props = defineProps<{ modelValue: RestRequestAuth }>();
const emit = defineEmits(['update:modelValue', 'updateRequest']);
const dataModel = useVModel(props, 'modelValue', emit);

if (!props.modelValue) {
  dataModel.value = defaultAuth;
}

const i18n = useI18n();

const authComponent = computed(() => {
  switch (dataModel.value.type) {
    case KEY_AUTH.NONE: return AuthNone;
    case KEY_AUTH.BASIC: return AuthBasic;
    case KEY_AUTH.BEARER: return AuthBearer;
    case KEY_AUTH.APIKEY: return AuthApiKey;
    case KEY_AUTH.OAUTH2: return AuthOauth;
    default: return AuthNone;
  }
});

const onUpdate = () => emit('updateRequest');

</script>
<style lang='scss' scoped>
:deep(.input-box .q-field__control),
:deep(.input-box .q-field__control:before),
:deep(.input-box .q-field__native),
:deep(.input-box .q-field__marginal){
  height: 30px;
  font-size: 0.8rem;
  min-height: 30px;
}

.rest-body-title {
  margin-right: 16px;
  align-self: center;
}
</style>

<template>
  <div class="label-color">
    <div class="row flex justify-center">
      <q-icon name="no_encryption" class="self-center" size="md"/>
    </div>
    <div class="row flex justify-center q-mt-md">
      {{i18n.t('REST.AUTH_NO_AUTH_LABEL')}}
    </div>
  </div>
</template>
<script lang="ts" setup>
import {useI18n} from 'vue-i18n';

const i18n = useI18n();
</script>

<template>
  <div>
    Auth Oauth 2.0
  </div>
</template>
<script lang="ts" setup>
import {RestRequestAuth} from "src/models/model";
import {useVModel} from "@vueuse/core/index";

const props = defineProps<{ modelValue: RestRequestAuth }>();
const emit = defineEmits(['update:modelValue']);
const dataModel = useVModel(props, 'modelValue', emit);
</script>

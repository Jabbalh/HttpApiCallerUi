<template>
  <SmartJson v-if="currentRequest" v-model="body" :editable="true" />
</template>
<script lang="ts" setup>

import SmartJson from "components/commun/SmartJson.vue";
import {useAppStore} from "stores/appStore";
import {computed, defineComponent} from "vue";

defineComponent({SmartJson});

const appState = useAppStore();

const currentRequest = appState.activeRestRequest;

const body = computed({
  get: () => currentRequest?.body ?? '',
  set: (value: string) => {
    if (currentRequest){
      currentRequest.body = value;
    }
  }
})

</script>

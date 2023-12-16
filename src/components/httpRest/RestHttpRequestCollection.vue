<template>
  <div class="q-ma-md">
    <RestHttpRequestAuth v-model="activeCollection.authorization" @updateRequest="onUpdate" />
  </div>
</template>
<script lang="ts" setup>
import RestHttpRequestAuth from 'components/httpRest/RestHttpRequestAuth.vue';
import {useAppStore} from 'stores/appStore';
import {computed} from 'vue';
import {IRestCollection} from 'src/models/model';

const appState = useAppStore();

const activeCollection = computed(() => appState.activeRestRequest as IRestCollection);

const onUpdate = () => {
  if (activeCollection.value){
    appState.updateSaveAttribute(activeCollection.value, false);
  }
}

</script>

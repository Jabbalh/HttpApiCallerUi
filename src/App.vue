<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAppStore } from 'stores/appStore';
import { useEnvStore } from 'stores/EnvStore';
import { useLoadDataCollection } from 'src/composables/loadLocalStorageData';

export default defineComponent({
  name: 'App',
  setup() {
    const appStore = useAppStore();
    const envStore = useEnvStore();
    const { loadCollection, mockCollection, mockEnv, loadEnvironement } = useLoadDataCollection();


    if (!loadCollection()) {
      appStore.$patch({
        restCollection: mockCollection,
      });
    }

    if (!loadEnvironement()) {
      envStore.$patch(mockEnv);
    }

  }
});
</script>

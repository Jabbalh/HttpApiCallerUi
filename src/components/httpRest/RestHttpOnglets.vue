<template>
  <q-tabs
    v-model="httpOnglets"
    indicator-color="accent"
    switch-indicator
    align="left"
    dense
    active-class="rest-http-onglets-active"
    class="rest-http-onglets"
    inline-label
    outside-arrows
    mobile-arrows
  >
    <q-tab v-for="(item, index) of openedRestRequest"
           no-caps
           :key="index"
           :name="item.id"
           class="rest-http-onglet layout-border-right"
           :ripple="false" content-class="rest-tab-with"
           >
      <SmartTab :label="item.name" :method="item.method" :id="item.id" @onClose="closeRequest(item)" :saved="item.isSaved" />
    </q-tab>
    <div class="rest-http-onglet rest-http-onglet-action">
      <q-btn round color="primary" icon="add" size="md" class="q-ml-md" flat @click="addNewRequest"/>
    </div>
  </q-tabs>
</template>
<script lang="ts">
import {computed, defineComponent } from 'vue';
import SmartTab from 'components/commun/SmartTab.vue';
import {useAppStore} from 'stores/appStore';
import {mapWritableState} from 'pinia';
import useRequestUtils from 'src/composables/RequestUtils';

export default defineComponent({
  name:'RestHttpOnglets',
  components: {SmartTab},
  setup(){
    const appStore = useAppStore();
    const { useCloseRequest, addRequest } = useRequestUtils();
    const { closeRequest } = useCloseRequest();

    const httpOnglets = computed({
      get: () => appStore.activeRestRequest?.id ?? '',
      set: (value: string) => appStore.activeRequest(value)
    });

    const addNewRequest = () => {
      addRequest();
    }

    return {
      addNewRequest,
      httpOnglets,
      closeRequest,
      addRequest
    }
  },
  computed: {
    ...mapWritableState(useAppStore, ['openedRestRequest'])
  }
});

</script>


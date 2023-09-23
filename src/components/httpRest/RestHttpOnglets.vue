<template>
  <q-tabs
    v-model="httpOnglets"
    indicator-color="accent"
    switch-indicator
    align="left"
    dense
    active-class="rest-http-onglets-active"
    class="rest-http-onglets"
  >
    <q-tab v-for="(item, index) of onglets"
           :key="index"
           :name="item.id"
           class="rest-http-onglet layout-border-right"
           :ripple="false" content-class="rest-tab-with">
      <SmartTab :label="item.name" :id="item.id" @onClose="closeTab" />
    </q-tab>
  </q-tabs>
</template>
<script lang="ts">
import {computed, defineComponent } from 'vue';
import SmartTab from 'components/commun/SmartTab.vue';
import {useAppStore} from 'stores/appStore';
import {RestRequest} from "src/models/model";

export default defineComponent({
  name:'RestHttpOnglets',
  components: {SmartTab},
  setup(){
    const appStore = useAppStore();

    const onglets = computed(() => appStore.openedRestRequest);
    const closeTab = (value:RestRequest) => {
      appStore.closeRequest(value);
    };

    const httpOnglets = computed({
      get: () => appStore.activeRestRequest,
      set: (value: string) => appStore.$patch({activeRestRequest: value})
    });

    return {
      onglets,
      httpOnglets,
      closeTab,
    }
  }
});

</script>
<style lang="scss">
.rest-tab-with {
  width: 100%;
  height: 100%;
}
  .rest-http-onglets {
    height: 40px;
    background-color: $panel-secondary-light;

  }

  .body--dark .rest-http-onglets {
    background-color: $panel-secondary-dark;
    filter: brightness(95%);
  }

  .rest-http-onglets-active {
    background-color: $panel-primary-light;
  }

  .body--dark .rest-http-onglets-active {
    background-color: $panel-primary-dark;
  }

  .rest-http-onglet {
    width: 172px;
  }

</style>

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
    <q-tab name="id-0" label="Mails" class="rest-http-onglet layout-border-right" />
    <q-tab name="id-1" label="Alarms" class="rest-http-onglet layout-border-right" />
    <q-tab name="id-3" label="Movies" class="rest-http-onglet layout-border-right" />
  </q-tabs>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';
export default defineComponent({
  name:'RestHttpOnglets',
  setup(){
    return {
      httpOnglets: ref('id-0')
    }
  }
});

</script>
<style lang="scss">
  .rest-http-onglets {
    height: 40px;
    background-color: $panel-secondary-light;
  }

  .body--dark .rest-http-onglets {
    background-color: $panel-secondary-dark;
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

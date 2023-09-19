<template>
  <div class="row">
  <q-tabs
    v-model="sidebarSelected"
    vertical
    indicator-color="transparent"
    active-color="accent"
    class="sidebar-tab layout-border-right panel-secondary"
  >
    <q-tab name="collections" icon="o_folder" class="tabs-side-font" />
    <q-tab name="environnement" icon="o_layers" class="tabs-side-font" />
    <q-tab name="history" icon="o_timeline" class="tabs-side-font" />
    <q-tab name="testPlan" icon="o_account_tree" class="tabs-side-font" />
  </q-tabs>
  <q-splitter
    v-model="splitterModel"
    class="rest-container"
    separator-class="splitter-separator"
    unit="px"
    :limits="[250, 450]"
    before-class="panel-secondary"
    after-class="panel-primary"
  >
    <template v-slot:before>
      <q-tab-panels v-model="sidebarSelected"
                    animated

                    class="shadow-2 rounded-borders full-height bg-transparent">
        <q-tab-panel name="collections">
          <RestCollection />
        </q-tab-panel>
        <q-tab-panel name="environnement">
          <RestEnvironnement />
        </q-tab-panel>

        <q-tab-panel name="history">
          <RestHistory />
        </q-tab-panel>
        <q-tab-panel name="testPlan">
          <RestTestPlan />
        </q-tab-panel>
      </q-tab-panels>
    </template>

    <template v-slot:after>
      <RestHttp />
    </template>

  </q-splitter>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';
import RestCollection from 'components/httpRest/RestCollection.vue';
import RestEnvironnement from 'components/httpRest/RestEnvironnement.vue';
import RestHistory from 'components/httpRest/RestHistory.vue';
import RestTestPlan from 'components/httpRest/RestTestPlan.vue';
import RestHttp from "components/httpRest/RestHttp.vue";

export default defineComponent({
  name: 'RestSidebar',
  components: {RestHttp, RestTestPlan, RestEnvironnement, RestCollection, RestHistory},
  setup(){
    return {
      sidebarSelected: ref('collections'),
      splitterModel: ref(300)
    }
  }
});


</script>


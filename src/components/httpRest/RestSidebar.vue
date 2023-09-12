<template>
  <q-tabs
    v-model="sidebarSelected"
    vertical
    indicator-color="transparent"
  >
    <q-tab name="collections" icon="o_folder" class="tabs-side-font" />
    <q-tab name="environnement" icon="o_layers" class="tabs-side-font" />
    <q-tab name="history" icon="o_timeline" class="tabs-side-font" />
    <q-tab name="testPlan" icon="o_account_tree" class="tabs-side-font" />
  </q-tabs>
  <q-splitter
    v-model="splitterModel"
    style="height: 400px"
  >

    <template v-slot:before>
      <q-tab-panels v-model="sidebarSelected" animated class="shadow-2 rounded-borders">
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
      <div class="q-pa-md">
        <div class="text-h4 q-mb-md">After</div>
        <div v-for="n in 20" :key="n" class="q-my-md">{{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</div>
      </div>
    </template>

  </q-splitter>

</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';
import RestCollection from 'components/httpRest/RestCollection.vue';
import RestEnvironnement from "components/httpRest/RestEnvironnement.vue";
import RestHistory from 'components/httpRest/RestHistory.vue';
import RestTestPlan from "components/httpRest/RestTestPlan.vue";

export default defineComponent({
  name: 'RestSidebar',
  components: {RestTestPlan, RestEnvironnement, RestCollection, RestHistory},
  setup(){
    return {
      sidebarSelected: ref("collections"),
      splitterModel: ref(30)
    }
  }
});


</script>

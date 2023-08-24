<template>
  <div  class="row">
    <div  class="inside-menu-left-width">
      <q-tabs
        v-model="selectedMainTab"
        vertical
        switch-indicator
        class="dense-tab .tab-menu-left border-tab-right"
        indicator-color="deep-purple-8"
        active-class="text-deep-purple-8"
        dense
      >
        <q-tab name="Collection" icon="bi-folder" label="" :ripple="false">
          <q-tooltip anchor="center right" self="center left" >
            Collections
          </q-tooltip>
        </q-tab>
        <q-tab name="Environnement" icon="bi-layers" label="" :ripple="false">
          <q-tooltip anchor="center right" self="center left">
            Environnement
          </q-tooltip>
        </q-tab>
        <q-tab name="History" icon="bi-clock-history" label="" :ripple="false">
          <q-tooltip anchor="center right" self="center left">
            Historique
          </q-tooltip>
        </q-tab>

      </q-tabs>
    </div>
    <div class="col">
      <q-splitter
        v-model="splitterModel"
        class="full-height-page"
        :limits="[20,30]"
        separator-class="bg-splitter-sep splitter-sep"
        unit="%">
        <template v-slot:before>
          <div class="q-ma-md">
            <component :is="selectedMainTab" />
          </div>

        </template>

        <template v-slot:after>
          <q-splitter
            v-model="splitterSecondModel"
            horizontal
            separator-class="bg-splitter-sep splitter-sep-horizontal"
            :limits="[10,Infinity]"
            unit="%">
            <template v-slot:before>
              <div class="q-ma-md">
                Request
              </div>
            </template>

            <template v-slot:after>
              <div class="q-ma-md">
                Response <q-input rounded v-model="inputResponse" />
              </div>
            </template>
          </q-splitter>
        </template>
      </q-splitter>
    </div>
  </div>


</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Collection from "components/httpRest/RestCollection.vue";
import Environnement from "components/httpRest/RestEnvironnement.vue";
import History from "components/httpRest/RestHistory.vue";
export default defineComponent({
  name: 'HttpRest',
  components: {
    Collection, Environnement, History
  },
  setup(){
    return {
      splitterModel: ref(20),
      splitterSecondModel: ref(50),
      selectedMainTab: ref("Collection"),
      inputResponse: ref("")
    }
  }
});

</script>

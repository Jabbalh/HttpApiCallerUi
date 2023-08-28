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
          <q-tabs
            v-model="selectRestTab"
            switch-indicator
            align="left"
            inline-label
            outside-arrows
            mobile-arrows
            indicator-color="deep-purple-8"
            class="rest-tabs"

          >
            <RestTab :alert="true"
                     :alert-icon="alertIconRef"
                     name="mails"
                     label="Mailssssssssssssaaaaaaa"  />
<!--            <q-tab name="mails"-->
<!--                   :ripple="false"-->
<!--                   label="Mailssssssssssssaaaaaaa"-->
<!--                   :alert="true"-->
<!--                   :alert-icon="alertIconRef"-->
<!--                   @mouseover="onEnter"-->
<!--                   @mouseleave="onLeave"-->
<!--                   />-->
            <q-tab name="alarms" :ripple="false" label="Alarms">
              test
            </q-tab>
            <q-tab name="movies" :ripple="false" label="Movies" :alert="true" alert-icon="bi-x-circle"/>
          </q-tabs>
          <RestHttpContainer />
        </template>
      </q-splitter>
    </div>
  </div>


</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Collection from 'components/httpRest/RestCollection.vue';
import Environnement from 'components/httpRest/RestEnvironnement.vue';
import History from 'components/httpRest/RestHistory.vue';
import useHoverTabs from "src/composables/HoverTabs";
import RestHttpContainer from "components/httpRest/RestHttpContainer.vue";
import RestTab from "components/commun/RestTab.vue";

export default defineComponent({
  name: 'HttpRest',
  components: {
    RestTab,
    RestHttpContainer,
    Collection, Environnement, History
  },
  setup(){
    return {
      splitterModel: ref(20),
      selectedMainTab: ref("Collection"),
      inputResponse: ref(""),
      selectRestTab: ref(""),
      ...useHoverTabs()
    }
  }
});

</script>

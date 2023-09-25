<template>
  <div class="row">
  <q-tabs
    v-model="sidebarSelected"
    vertical
    indicator-color="transparent"
    active-color="accent"
    class="sidebar-tab layout-border-right panel-secondary col"
  >
    <q-tab name="collections" icon="o_folder" class="tabs-side-font">
      <q-tooltip anchor="center end" self="center start" :class="tooltipColor">
        {{i18n.t('REST.TAB_COLLECTION')}}
      </q-tooltip>
    </q-tab>
    <q-tab name="environnement" icon="o_layers" class="tabs-side-font">
      <q-tooltip anchor="center end" self="center start" :class="tooltipColor">
        {{i18n.t('REST.TAB_ENVIRONNEMENT')}}
      </q-tooltip>
    </q-tab>
    <q-tab name="history" icon="o_timeline" class="tabs-side-font">
      <q-tooltip anchor="center end" self="center start" :class="tooltipColor">
        {{i18n.t('REST.TAB_HISTORY')}}
      </q-tooltip>
    </q-tab>
    <q-tab name="testPlan" icon="o_account_tree" class="tabs-side-font">
      <q-tooltip anchor="center end" self="center start" :class="tooltipColor">
        {{i18n.t('REST.TAB_TEST_PLAN')}}
      </q-tooltip>
    </q-tab>
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
import {computed, defineComponent, ref} from 'vue';
import RestCollection from 'components/httpRest/RestCollection.vue';
import RestEnvironnement from 'components/httpRest/RestEnvironnement.vue';
import RestHistory from 'components/httpRest/RestHistory.vue';
import RestTestPlan from 'components/httpRest/RestTestPlan.vue';
import RestHttp from 'components/httpRest/RestHttp.vue';
import {useI18n} from 'vue-i18n';
import {useQuasar} from 'quasar';

export default defineComponent({
  name: 'RestSidebar',
  components: {RestHttp, RestTestPlan, RestEnvironnement, RestCollection, RestHistory},
  setup(){
    const i18n = useI18n();
    const q$ = useQuasar();

    const tooltipColor = computed(() => {
      return q$.dark.isActive ? 'bg-white text-black': 'bg-black text-white'
    });

    return {
      sidebarSelected: ref('collections'),
      splitterModel: ref(300),
      i18n,
      tooltipColor
    }
  }
});


</script>


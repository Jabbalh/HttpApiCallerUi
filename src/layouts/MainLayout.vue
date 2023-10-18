<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      class="panel-primary layout-border-bottom"
      >
      <q-toolbar>
        <q-toolbar-title>
          HttpApiCaller
        </q-toolbar-title>
        <q-space />
        <q-btn label="dark" @click="toogleDarkMode" />
      </q-toolbar>
    </q-header>
    <q-footer class="panel-primary layout-border-top" style="height: 35px; display: flex;align-items: center;margin-left: 8px">
      <span>Version 1.0.0</span>
    </q-footer>
    <q-page-container>
      <div class="row">
        <div class="layout-border-right panel-secondary" style="width: 80px">
          <q-scroll-area class="fit">
            <q-tabs
              vertical
              v-model="selectedMainTab"
              switch-indicator
              active-color="accent"
              indicator-color="accent"
              content-class="tabs-content"
            >
              <q-route-tab icon="bi-code" label="REST" to="/rest"  :ripple="false" content-class="tabs-side-font-bold" />
              <q-route-tab icon="o_timeline" label="TEST" to="/test" :ripple="false" content-class="tabs-side-font-bold"/>
              <q-route-tab icon="tune" label="SETTINGS" to="/settings" :ripple="false" content-class="tabs-side-font-bold"/>
            </q-tabs>
          </q-scroll-area>
        </div>
        <div class="col">
        <RouterView
          v-slot="{ Component }"
          class="flex flex-1 min-w-0"
        >
          <Transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            mode="out-in" appear>
            <component :is="Component" />
          </Transition>
        </RouterView>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import {useQuasar} from 'quasar';
import useTheme from 'src/composables/Themes';

export default defineComponent({
  name: 'MainLayout',

  components: {

  },

  setup () {
    const quasar = useQuasar();
    const theme = useTheme();
    theme.initTheme();
    //quasar.dark.toggle();
    const toogleDarkMode = () => {
      if (quasar.dark.isActive ){
        theme.defaultTheme();
      } else {
        theme.darkTheme();
      }
    };

    return {
      bgClass: computed(() => quasar.dark.isActive ? 'bg-dark' : 'bg-white'),
      iconMode: computed(() => quasar.dark.isActive ? 'light_mode' : 'dark_mode'),
      toogleDarkMode,
      menuLeft: ref(true),
      selectedMainTab: ref('REST')
    }
  }
});
</script>

<style lang="scss">

</style>

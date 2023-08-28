<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      class="bg-header header-style"
      >
      <q-toolbar>
        <q-toolbar-title>
          HttpApiCaller
        </q-toolbar-title>
        <div><q-icon :name="iconMode" @click="toogleDarkMode" size="md" /></div>
      </q-toolbar>
    </q-header>
    <q-footer :class="bgClass" class="footer-style">
      Footer
    </q-footer>
    <q-drawer
      v-model="menuLeft"
      :width="100"
      class="bg-header"
    >
      <q-scroll-area class="fit border-tab-right">
        <q-tabs
          vertical
          switch-indicator
          indicator-color="deep-purple-8"
        >
          <q-route-tab icon="bi-code" label="REST" to="/"  :ripple="false" />
          <q-route-tab icon="o_timeline" label="TEST" to="/test" :ripple="false"/>
        </q-tabs>
      </q-scroll-area>

    </q-drawer>

    <q-page-container>
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
      selectedMainTab: ref('rest')
    }
  }
});
</script>

<template>
  <q-page class="page">
    <div>
      Paramètres
    </div>
    <div class="color_input">
      <div class="q-pa-md">
        main color selection
        <div class="q-gutter-md row items-start">
          <q-input filled color="accent" v-model="hex">
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-color :model-value="hex" @change="val => { hex = val }" no-header-tabs class="c_panel" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div>
          <q-toggle v-model="menu" label="dark" @click="toogleDarkMode" />
        </div>
      </div>
    </div>
  </q-page>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import useTheme from 'src/composables/Themes';
export default defineComponent({
  name: 'ParameterPage',
  setup() {

    const quasar = useQuasar();
    const theme = useTheme();
    theme.initTheme();

    //quasar.dark.toggle();
    const toogleDarkMode = () => {
      if (quasar.dark.isActive) {
        theme.defaultTheme();
      } else {
        theme.darkTheme();
      }
    };
    return {
      hex: ref('#8f1ca3'),
      bgClass: computed(() => quasar.dark.isActive ? 'bg-dark' : 'bg-white'),
      iconMode: computed(() => quasar.dark.isActive ? 'light_mode' : 'dark_mode'),
      toogleDarkMode,
      menu: ref(quasar.dark.isActive)
    }
  }
});


</script>
<style lang="scss">
.page {
  display: block;
}

.color_input {
  border: solid 1px;
  border-radius: 10px;
  width: 20%;
}

.c_panel {
  height: 100%;
  width: 200px
}
</style>
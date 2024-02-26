<template>
  <q-page class="page">
    <div class="title">
      Général
      <q-icon name="settings" />
    </div>
    <div class="theme">Thèmes</div>
    <div class="wrapper">
      <q-separator inset class="q-mt-md q-mb-md" />
      <div>
        <div class="dark_mode_btn">
          <q-toggle v-model="menu" label="dark mode" @click="toogleDarkMode" />
        </div>
      </div>
      <q-separator inset class="q-mt-md q-mb-md" />
      <div>
        <div class="q-pa-md color_btn">
          <q-btn label="Couleur principale" color="accent" icon-right="colorize">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-color :model-value="hex" @change="val => { hex = val }" no-header-tabs class="c_panel" />
            </q-popup-proxy>
          </q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useQuasar, getCssVar, setCssVar } from 'quasar';
import useTheme from 'src/composables/Themes';
export default defineComponent({
  name: 'ParameterPage',
  setup() {

    const quasar = useQuasar();
    const theme = useTheme();
    //quasar.dark.toggle();
    const toogleDarkMode = () => {
      if (quasar.dark.isActive) {
        theme.defaultTheme();
      } else {
        theme.darkTheme();
      }
    };

    const hex = ref(quasar.localStorage.getItem<string>('theme-accent') ?? '#8f1ca3');
    setCssVar('accent', hex.value);
    watch(hex, newValue => {
      theme.updateAccent(newValue);
      setCssVar('accent', hex.value);
    })
    return {
      hex,
      toogleDarkMode,
      menu: ref(quasar.dark.isActive)
    }
  }
});


</script>
<style lang="scss">
.title {
  margin-left: 2%;
  margin-top: 1%;
  font-size: 40px;
}

.page {
  display: block;
}


.c_panel {
  height: 100%;
  width: 200px
}

.theme {
  margin-left: 2%;
  font-size: 20px;
}



.dark_mode_btn {
  padding-left: 3%;
}




.color_btn {
  padding-left: 3%;
}
</style>
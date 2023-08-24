<template>
  <q-page >
<!--    <div class="row">-->
<!--      Hello world-->
<!--    </div>-->

<!--    <div class="row">-->
<!--      <div class="col-2">-->
<!--        <q-btn label="theme par default" @click="defaultTheme()" color="accent" />-->
<!--      </div>-->
<!--      <div class="col-2">-->
<!--        <q-btn label="dark theme" @click="darkTheme()" color="accent"/>-->
<!--      </div>-->
<!--    </div>-->


  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useTheme from "src/composables/Themes";
import RestPage from "pages/RestPage.vue";

export default defineComponent({
  name: 'IndexPage',
  components: { RestPage },
  setup () {
    return {
      ...useTheme()
    };
  }
});
</script>

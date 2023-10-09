<template>
  <div class="rest-http-header" >
    <div class="rest-http-wrapper">
      <RestHttpOnglets />
    </div>
    <div class="rest-http-onglet-env ">
      <q-select
        borderless
        :options="options"
        v-model="envModel"
        option-value="name"
        option-label="name"
        dense
        dropdown-icon="expand_more"
        @update:modelValue="updateEnv"
        class="select" />
    </div>
  </div>
  <RestHttpContainer/>
</template>
<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import RestHttpOnglets from 'components/httpRest/RestHttpOnglets.vue';
import RestHttpContainer from 'components/httpRest/RestHttpContainer.vue';
import {useEnvStore} from "stores/EnvStore";
import {AppEnvironnement} from "src/models/model";

export default defineComponent({
  name:'RestHttp',
  components: {RestHttpContainer, RestHttpOnglets },
  setup(){
    const envStore = useEnvStore();
    const options = computed(() => envStore.AppEnvironnement);
    const envModel = ref<AppEnvironnement>();
    const updateEnv = (value: AppEnvironnement) => {
      const item: AppEnvironnement | undefined = options.value.find(x => x.name == value.name);
      if (item){
        envStore.$patch({
          Current: item
        });
      }

    };

    return {
      updateEnv,
      options,
      envModel
    }
  }
});

</script>

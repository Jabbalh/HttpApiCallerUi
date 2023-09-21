<template>
  <router-view />
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {useQuasar} from 'quasar';
import {RestCollection} from 'src/models/model';
import { uid } from 'quasar'
import {useAppStore} from 'stores/appStore';

export default defineComponent({
  name: 'App',
  setup(){
    const q$ = useQuasar();
    const appStore = useAppStore();

    let mock = ref<RestCollection[]>([{
      isLocal: true,
      id: uid(),
      name: 'Ma collection',
      childs: [],
      requests: [
        {
          id: uid(),
          name:'Requete 1',
          method: 'GET',
          url: 'https://echo.hoppscotch.io',
          isOpen: true,
          parameter: {}
        },
        {
          id: uid(),
          name:'Requete 2',
          method: 'POST',
          url: 'https://test.fr',
          isOpen: false,
          parameter: {}
        }
      ]
    }]);
    if (q$.localStorage.has('mock')){
      mock.value = q$.localStorage.getItem<RestCollection[]>('mock') ?? mock.value;
    } else {
      //q$.localStorage.set('mock', mock.value);
    }

    appStore.$patch({
      restCollection: mock.value,
      currentRestCollection:  mock.value[0]
    });


  }
});
</script>

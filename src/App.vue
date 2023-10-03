<template>
  <router-view />
</template>

<script lang="ts">
import {defineComponent, ref, watch} from 'vue';
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
      isCollection: true,
      isLocal: true,
      id: uid(),
      name: 'Ma collection',
      isSaved: true,
      childs: [],
      requests: [
        {
          id: uid(),
          name:'Requete 1',
          method: 'GET',
          url: 'https://echo.hoppscotch.io',
          isOpen: true,
          isSaved: true,
          parameter: [],
          response: {
            response: ''
          }
        },
        {
          id: uid(),
          name:'Requete 2',
          method: 'POST',
          url: 'https://test.fr',
          isOpen: false,
          isSaved: true,
          parameter: [],
          response: {
            response: ''
          }
        }
      ]
    }]);

    if (q$.localStorage.has('REST_STATE')){
      const state = q$.localStorage.getItem<string>('REST_STATE');
      if (state){
        appStore.$patch(JSON.parse(state));
      }

    } else {
      appStore.$patch({
        restCollection: mock,
      })
    }

    watch(appStore.$state,
      (state) => {
        localStorage.setItem('REST_STATE',JSON.stringify(state));
      },
      {
        deep: true
      }
    )
  }
});
</script>

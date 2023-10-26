import {uid, useQuasar} from 'quasar';
import {IAppStore, useAppStore} from 'src/stores/appStore';
import {useEnvStore} from 'src/stores/EnvStore';
import { RestRequest} from 'src/models/model';
import useRequestUtils from 'src/composables/RequestUtils';
import {LANGUAGE} from 'src/models/Constantes';
import {watch} from 'vue';

export const useLoadDataCollection = function() {
  const q$ = useQuasar();
  const appStore = useAppStore();
  const envStore = useEnvStore();

  watch(appStore.$state,
    (state) => {
      localStorage.setItem('REST_STATE',JSON.stringify(state));
    },
    {
      deep: true
    }
  )

  watch(envStore.$state, state => {
    localStorage.setItem('REST_ENV',JSON.stringify(state));
  },{
    deep: true
  });

  const load = () => {
    if (q$.localStorage.has('REST_STATE')){
      const state = q$.localStorage.getItem<string>('REST_STATE');
      if (state){
        appStore.$patch(parseData(state));
        return true;
      }
    }
    return false;
  }

  return {
    load,
    mockCollection,
    mockEnv
  }
}

function parseData(state: string){
  const data: IAppStore = JSON.parse(state);
  const openCollection:RestRequest[] = [];
  const requestUtils = useRequestUtils();

  for (const item of data.openedRestRequest){
    const request = requestUtils.findRequestById(data.restCollection, item.id);
    if (request) {
      openCollection.push(request);
      if (request.id == data.activeRestRequest?.id){
        data.activeRestRequest = request;
      }
    } else {
      openCollection.push(item);
    }
  }
  data.openedRestRequest = openCollection;
  return data as any;
}

const mockCollection = [{
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
      header: [],
      body: {
        body: '',
        language: LANGUAGE.nothing
      },
      response: undefined
    },
    {
      id: uid(),
      name:'Requete 2',
      method: 'POST',
      url: 'https://test.fr',
      isOpen: false,
      isSaved: true,
      parameter: [],
      header: [],
      body: {
        body: '',
        language: LANGUAGE.nothing
      },
      response: undefined
    }
  ]
}];

const mockEnv = {
  AppEnvironnement: [
    {
      name: 'DEV',
      values: [
        {
          id: 1,
          entry: { key: 'user',  value: 'toto dev',  active: true },
        },
          {
            id: 2,
              entry:{ key:'id',  value:'id dev', active: true },
          }
      ]
    },
      {
          name: 'PROD',
          values: [
              {
                  id: 1,
                  entry: { key: 'user',  value: 'toto dev',  active: true },
              },
              {
                  id: 2,
                  entry:{ key:'id',  value:'id dev', active: true },
              }
          ]
      },
  ]
};

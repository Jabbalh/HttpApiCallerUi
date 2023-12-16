import { uid, useQuasar } from 'quasar';
import { IAppStore, useAppStore } from 'src/stores/appStore';
import { useEnvStore } from 'src/stores/EnvStore';
import { IRestCollection, RestRequest } from 'src/models/model';
import useRequestUtils from 'src/composables/RequestUtils';
import { LANGUAGE } from 'src/models/Constantes';
import { watch } from 'vue';
import RestCollection from 'src/models/RestCollection';
import { defaultAuth } from 'src/helpers/DefaultTypeUtils';

export const useLoadDataCollection = function () {
  const q$ = useQuasar();
  const appStore = useAppStore();
  const envStore = useEnvStore();

  watch(appStore.$state,
    (state) => {
      localStorage.setItem('REST_STATE', JSON.stringify(state));
    },
    {
      deep: true
    }
  )

  watch(envStore.$state, state => {
    localStorage.setItem('REST_ENV', JSON.stringify(state));
  }, {
    deep: true
  });

  const loadCollection = () => {
    if (q$.localStorage.has('REST_STATE')) {
      const state = q$.localStorage.getItem<string>('REST_STATE');
      if (state) {
        appStore.$patch(parseData(state));
        return true;
      }
    }
    return false;
  }

  const loadEnvironement = () => {
    if (q$.localStorage.has('REST_ENV')) {
      const state = q$.localStorage.getItem<string>('REST_ENV');
      if (state) {
        envStore.$patch(JSON.parse(state));
        return true;
      }
    }
    return false;
  }



  return {
    loadCollection,
    loadEnvironement,
    mockCollection,
    mockEnv
  }
}

function parseData(state: string) {
  const data: IAppStore = JSON.parse(state);

  data.restCollection = defineNode(data.restCollection, []);
  const openCollection: (RestRequest | IRestCollection)[] = [];
  const requestUtils = useRequestUtils();

  for (const item of data.openedRestRequest) {
    const request = requestUtils.findRequestById(data.restCollection, item.id);
    if (request) {
      openCollection.push(request);
      if (request.id == data.activeRestRequest?.id) {
        data.activeRestRequest = request;
      }
    } else {
      openCollection.push(item);
    }
  }
  data.openedRestRequest = openCollection;
  return data as any;
}

/**
 * COnverti le JSON en Object concret
 * @param values
 * @param result
 */
function defineNode(values: IRestCollection[], result: IRestCollection[]): IRestCollection[] {
  for (const item of values) {
    result.push(new RestCollection((item)));
    if (item.childs && item.childs.length > 0) {
      const tmp = defineNode(item.childs, []);
      item.childs.splice(0, item.childs.length);
      item.childs.push(...tmp);
    }
  }
  return result;
}


const mockCollection = [{
  isCollection: true,
  isLocal: true,
  isActive: false,
  id: uid(),
  name: 'Ma collection',
  authorization: defaultAuth,
  isSaved: true,
  childs: [],
  requests: [
    {
      id: uid(),
      name: 'Requete 1',
      method: 'GET',
      url: 'https://echo.hoppscotch.io',
      isOpen: true,
      isSaved: true,
      isActive: false,
      parameter: [],
      authorization: defaultAuth,
      header: [],
      body: {
        body: '',
        language: LANGUAGE.nothing
      },
      response: undefined
    },
    {
      id: uid(),
      name: 'Requete 2',
      method: 'POST',
      url: 'https://test.fr',
      isOpen: false,
      isActive: false,
      isSaved: true,
      parameter: [],
      authorization: defaultAuth,
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
      id: uid(),
      values: [
        {
          id: 1,
          entry: { key: 'user', value: 'toto dev', active: true },
        },
        {
          id: 2,
          entry: { key: 'id', value: 'id dev', active: true },
        }
      ]
    },
    {
      name: 'PROD',
      id: uid(),
      values: [
        {
          id: 1,
          entry: { key: 'user', value: 'toto dev', active: true },
        },
        {
          id: 2,
          entry: { key: 'id', value: 'id dev', active: true },
        }
      ]
    }
  ],
  Global: {
    name: 'Global',
    values: [
      { key: 'superuser', value: 'Nicolas', active: true },
    ]
  }
};

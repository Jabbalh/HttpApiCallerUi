import {useI18n} from 'vue-i18n';
import {useQuasar} from 'quasar';
import {useAppStore} from 'stores/appStore';
import {RestCollection, RestRequest} from 'src/models/model';

const useRequestUtils = function() {
  const i18n = useI18n();
  const q$ = useQuasar();
  const appStore = useAppStore();
  const addRequest = () => {
    return new Promise<RestRequest>(r => {
      q$.dialog({
        title:i18n.t('REST.ADD_REQUEST_TITLE'),
        prompt: {
          type:'text',
          model: '',
          outlined: true,
          label: i18n.t('REST.ADD_REQUEST_PLACEHOLDER')
        },
        cancel: true
      }).onOk((x: string) => {
        r(appStore.addRestRequest(x));
      })
    })

  }

  return {
    addRequest,
    findCollectionById,
    findParentCollectionById,
    useSaveRestRequest,
    useCloseRequest,
    findRequestById
  }
}

function useCloseRequest() {
  const appStore = useAppStore();
  const q$ = useQuasar();
  const i18n = useI18n();
  const { saveRequest } = useSaveRestRequest();
  const closeRequest = (value: RestRequest) => {
    if (value && !value.isSaved){
      q$.dialog({
        title: i18n.t('REST.REQUEST_NOT_SAVED_TITLE'),
        message: i18n.t('REST.REQUEST_NOT_SAVED_MESSAGE'),
        cancel: true
      }).onOk(() => {
        saveRequest(value);
        appStore.closeRequest(value);
      }).onCancel(() => appStore.closeRequest(value));
    } else {
      appStore.closeRequest(value);
    }
  }

  return {
    closeRequest
  }
}

/**
 * Sauvegarde de la requète
 */
function useSaveRestRequest(){

  const q$ = useQuasar();

  const save = (value: RestRequest, collection: RestCollection[]) => {
    const parent = findParentCollectionById(collection, value.id);
    if (parent){
      const origin = parent.requests.find(x => x.id == value.id);
      if (origin){
        const indexOrigin = parent.requests.indexOf(origin);
        value.isSaved = true;
        parent.requests[indexOrigin] = value;
        return true;
      }
    }
    return false;
  };

  const saveRequest = (value?: RestRequest): void => {
    const appStore = useAppStore();
    const request = value ?? appStore.activeRestRequest;
    if (request && !request.isSaved){
      const result = save(request, appStore.restCollection);
      if (result){
        q$.notify({
          message: 'Sauvegarde réussie',
          type: 'positive'
        });
      } else {
        q$.notify({
          message: 'Echec de l sauvegarde',
          type: 'negative'
        });
      }
    }
  }

  return {
    saveRequest
  }

}

/**
 * Recherche une collection par son ID
 * @param collections
 * @param id
 */
function findCollectionById(collections: RestCollection[], id: string) : RestCollection | null{
  // noinspection LoopStatementThatDoesntLoopJS
  for (const item of collections){
    if (item.id == id){
      return item;
    } else {
      return findCollectionById(item.childs, id);
    }
  }
  return null;
}

/**
 * Recherche la collection parente de l'ID de requete passé en paramètre
 * @param collections
 * @param id
 */
function findParentCollectionById(collections: RestCollection[], id: string) : RestCollection | null{
  // noinspection LoopStatementThatDoesntLoopJS
  for (const item of collections){
    if (item.requests.some(x => x.id == id)){
      return item;
    } else {
      return findCollectionById(item.childs, id);
    }
  }
  return null;
}

/**
 * Recherche une requète par son ID
 * @param collections
 * @param id
 */
function findRequestById(collections: RestCollection[], id: string): RestRequest | null {
  // noinspection LoopStatementThatDoesntLoopJS
  for (const item of collections){
    const request = item.requests.find(x => x.id == id);
    if (request){
      return request;
    } else {
      return findRequestById(item.childs, id);
    }
  }
  return null;
}

export default useRequestUtils;

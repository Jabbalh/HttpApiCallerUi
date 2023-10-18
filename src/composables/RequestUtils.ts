import {useI18n} from 'vue-i18n';
import {useQuasar} from 'quasar';
import {useAppStore} from 'stores/appStore';
import {RestCollection, RestRequest} from 'src/models/model';
import useActiveRequest from 'src/composables/ActiveRequest';
import PopinSaveRequest from 'components/collection/PopinSaveRequest.vue';
import * as E from 'fp-ts/Either';

const useRequestUtils = function() {
  const i18n = useI18n();
  const q$ = useQuasar();
  const appStore = useAppStore();
  const addRequest = (request?: RestRequest, isSaved?: boolean) => {
    return new Promise<RestRequest>(r => {
      q$.dialog({
        title:i18n.t('REST.ADD_REQUEST_TITLE'),
        prompt: {
          type:'text',
          model: request?.name ?? '',
          outlined: true,
          label: i18n.t('REST.ADD_REQUEST_PLACEHOLDER')
        },
        cancel: true
      }).onOk((x: string) => {
        if (request){
          request.name = x;
          r(request);
        } else {
          r(appStore.addRestRequest(x, isSaved));
        }

      })
    })
  }

  const addFolder = (collection?: RestCollection) => {
    return new Promise<RestCollection>(r => {
      q$.dialog({
        title:i18n.t('REST.ADD_FOLDER_TITLE'),
        prompt: {
          type:'text',
          model: collection?.name ?? '',
          outlined: true,
          label: i18n.t('REST.ADD_FOLDER_PLACEHOLDER')
        },
        cancel: true
      }).onOk((x: string) => {
        if (collection){
          collection.name = x;
          r(collection);
        } else {
          r(appStore.addCollection(x));
        }

      })
    })
  }

  return {
    addRequest,
    addFolder,
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
  const i18n$ = useI18n();
  const save = (value: RestRequest, collection: RestCollection[]) => {
    return new Promise<E.Either<boolean, boolean>>(r => {
      const parent = findParentCollectionById(collection, value.id);
      if (parent){
        const origin = parent.requests.find(x => x.id == value.id);
        if (origin){
          const indexOrigin = parent.requests.indexOf(origin);
          value.isSaved = true;
          parent.requests[indexOrigin] = value;
          return r(E.right(true));
        } else {
          return r(E.left(false));
        }
      } else {
        q$.dialog({
          component: PopinSaveRequest,
          componentProps: {
            collection: collection,
            request: value
          }
        }).onOk((payload: {id: string, name: string}) => {
          const parent = findCollectionById(collection, payload.id);
          if (parent){
            value.isSaved = true;
            value.name = payload.name;
            parent.requests.push(value);
            r(E.right(true));
          } else {
            r(E.right(false));
          }
        }).onCancel(() => r(E.left(true)))
      }
    });
  };

  const saveRequest = async (value?: RestRequest): Promise<void> => {
    const appStore = useAppStore();
    const activeRequest = useActiveRequest()
    const request = value ?? activeRequest.activeRequest.value;
    if (request && !request.isSaved){
      const result = await save(request, appStore.restCollection);
      if (E.isRight(result)){
        if (result.right){
          q$.notify({
            message: i18n$.t('REST.MESSAGE_SAUVEGARDE_OK'),
            type: 'positive'
          });
        } else {
          q$.notify({
            message: i18n$.t('REST.MESSAGE_SAUVEGARDE_NOK'),
            type: 'negative'
          });
        }
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
export function findCollectionById(collections: RestCollection[], id: string) : RestCollection | null{
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

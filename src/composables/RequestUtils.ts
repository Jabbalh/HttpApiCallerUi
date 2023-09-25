import {useI18n} from 'vue-i18n';
import {useQuasar} from 'quasar';
import {useAppStore} from 'stores/appStore';
import {RestCollection, RestRequest} from "src/models/model";

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
    findParentCollectionById
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

export default useRequestUtils;

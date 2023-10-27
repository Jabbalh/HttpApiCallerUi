import {useAppStore} from 'stores/appStore';
import {computed} from 'vue';
import {IRestCollection, RestRequest} from 'src/models/model';

/**
 * Renvois un compute sur la request active
 */
const useActiveRequest = function() {
  const appStore = useAppStore();
  const activeRequest = computed(() => appStore.activeRestRequest)
  return {
    activeRequest
  }
}

const isCollection = (value: RestRequest | IRestCollection) => {
  return 'isCollection' in value;
}

export {
  isCollection
}
export default useActiveRequest;

import {useAppStore} from 'stores/appStore';
import {computed} from 'vue';
import {RestCollection, RestRequest} from 'src/models/model';

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

const isCollection = (value: RestRequest | RestCollection) => {
  return 'isCollection' in value;
}

export {
  isCollection
}
export default useActiveRequest;

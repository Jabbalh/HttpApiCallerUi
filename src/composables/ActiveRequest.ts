import {useAppStore} from 'stores/appStore';
import {computed} from "vue";

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



export default useActiveRequest;

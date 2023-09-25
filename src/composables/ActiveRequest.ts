import {useAppStore} from 'stores/appStore';
import {computed} from "vue";

const useActiveRequest = function() {
  const appStore = useAppStore();

  const activeRequest = computed(() => appStore.activeRestRequest)

  return {
    activeRequest
  }
}

export default useActiveRequest;

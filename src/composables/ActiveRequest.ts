import {useAppStore} from 'stores/appStore';
import {computed} from "vue";

const useActiveRequest = function() {
  const appStore = useAppStore();

  const activeRequest = computed(() => {
    const request = appStore.activeRestRequest;
    return appStore.openedRestRequest.find(x => x.id == request)
  })

  return {
    activeRequest
  }
}

export default useActiveRequest;

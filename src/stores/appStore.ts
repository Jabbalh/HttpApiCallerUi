import { defineStore } from 'pinia'
import {RestCollection, RestRequest} from 'src/models/model';
import remove from 'lodash.remove';
import {uid} from 'quasar';

export interface IAppStore {
  restCollection: RestCollection[],
  openedRestRequest: RestRequest[],
  activeRestRequest: string
}
export const useAppStore = defineStore('app', {
  state: (): IAppStore => {
    return {
      restCollection: [],
      openedRestRequest: [],
      activeRestRequest: ''
    }
  },
  actions: {
    openRequest(value: RestRequest){
      if (!this.openedRestRequest.some(x => x.id == value.id)){
        this.openedRestRequest.push(value);
      }
      this.activeRestRequest = value.id;
    },
    closeRequest(value: RestRequest){
      remove(this.openedRestRequest, (x: RestRequest) => x.id == value.id);
    },
    addRestRequest(value: string){
      const request: RestRequest = {
        id: uid(),
        name: value,
        isOpen: true,
        method: 'GET',
        isSaved: false,
        url: '',
        parameter: {

        }
      }
      this.openedRestRequest.push(request);
      this.activeRestRequest = request.id;
    },
    addRequestOnCollection(request: RestRequest, collection: RestCollection){
      collection.requests.push(request);
    }
  }

})

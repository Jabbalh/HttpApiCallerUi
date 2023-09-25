import { defineStore } from 'pinia'
import {RestCollection, RestRequest} from 'src/models/model';
import remove from 'lodash.remove';
import cloneDeep from 'lodash.cloneDeep';
import {uid} from 'quasar';

export interface IAppStore {
  restCollection: RestCollection[],
  openedRestRequest: RestRequest[],
  activeRestRequest?: RestRequest
}
export const useAppStore = defineStore('app', {
  state: (): IAppStore => {
    return {
      restCollection: [],
      openedRestRequest: [],
      activeRestRequest: undefined
    }
  },
  actions: {
    activeRequest(id: string){
      const request = this.openedRestRequest.find(x => x.id == id);
      if (request){
        this.activeRestRequest = request;
      }
    },
    openRequest(value: RestRequest){
      const request = this.openedRestRequest.find(x => x.id == value.id);
      if (!request){
        this.cloneAndAddToOpenedRequest(value);
      }
      this.activeRestRequest = request;
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
        },
        response: {
          response: ''
        }
      }
      this.cloneAndAddToOpenedRequest(request);
      this.activeRestRequest = request;
    },
    addRequestOnCollection(request: RestRequest, collection: RestCollection){
      collection.requests.push(request);
    },
    cloneAndAddToOpenedRequest(value: RestRequest){
      this.openedRestRequest.push(cloneDeep(value));
    },
    saveRequest(value: RestRequest){
      console.log("saveRequest", value);
    }
  }

})

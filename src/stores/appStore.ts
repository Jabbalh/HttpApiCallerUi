import { defineStore } from 'pinia'
import {RestCollection, RestRequest} from 'src/models/model';
import remove from 'lodash/remove';
import cloneDeep from 'lodash/cloneDeep';
import {uid} from 'quasar';
import {LANGUAGE} from "src/models/Constantes";

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
      console.log('activeRequest', id);
      const request = this.openedRestRequest.find(x => x.id == id);
      if (request){
        this.activeRestRequest = request;
      }
    },
    openRequest(value: RestRequest){
      let request = this.openedRestRequest.find(x => x.id == value.id);
      if (!request){
        request = this.cloneAndAddToOpenedRequest(value);
      }
      this.activeRestRequest = request;
    },
    closeRequest(value: RestRequest){
      remove(this.openedRestRequest, (x: RestRequest) => x.id == value.id);
      if (this.openedRestRequest.length > 0){
        this.activeRestRequest = this.openedRestRequest[this.openedRestRequest.length -1];
      }
    },
    addRestRequest(value: string, isSaved?: boolean){
      const request: RestRequest = {
        id: uid(),
        name: value,
        isOpen: true,
        method: 'GET',
        isSaved: isSaved ?? false,
        url: '',
        body: {
          language: LANGUAGE.nothing,
          body: ''
        },
        parameter: [],
        header: [],
        response: undefined
      }

      this.activeRestRequest = this.cloneAndAddToOpenedRequest(request);
      return request;
    },
    addCollection(value: string){
      const col: RestCollection = {
        id: uid(),
        name: value,
        requests: [],
        isLocal: true,
        isSaved: true,
        isCollection: true,
        childs: [],
      }
      return col;
    },
    addRequestOnCollection(request: RestRequest, collection: RestCollection){
      collection.requests.push(request);
    },
    cloneAndAddToOpenedRequest(value: RestRequest){
      const request = cloneDeep(value);
      this.openedRestRequest.push(request);
      return request;
    },
    saveRequest(value: RestRequest){
      console.log('saveRequest', value);
    },
    updateSaveAttribute(value: RestRequest, saveAttribute: boolean){
      value.isSaved = saveAttribute;

    }
  }

})

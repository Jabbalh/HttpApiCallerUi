import { defineStore } from 'pinia'
import {IRestCollection, RestRequest} from 'src/models/model';
import remove from 'lodash/remove';
import cloneDeep from 'lodash/cloneDeep';
import {uid} from 'quasar';
import {LANGUAGE} from 'src/models/Constantes';
import RestCollection from 'src/models/RestCollection';

export interface IAppStore {
  restCollection: IRestCollection[],
  openedRestRequest: (RestRequest | IRestCollection)[],
  activeRestRequest?: RestRequest | IRestCollection,
  histories: RestRequest[]
}
export const useAppStore = defineStore('app', {
  state: (): IAppStore => {
    return {
      restCollection: [],
      openedRestRequest: [],
      activeRestRequest: undefined,
      histories: []
    }
  },
  actions: {
    activeRequest(id: string){
      const request = this.openedRestRequest.find(x => x.id == id);
      if (request){
        if (this.activeRestRequest) {
          this.activeRestRequest.isActive = false;
        }
        request.isActive = true;
        this.activeRestRequest = request;
      }
    },
    openRequest(value: RestRequest | IRestCollection){
      let request = this.openedRestRequest.find(x => x.id == value.id);
      if (!request){
        request = this.cloneAndAddToOpenedRequest(value);
      }
      if (this.activeRestRequest) {
        this.activeRestRequest.isActive = false;
      }
      request.isActive = true
      this.activeRestRequest = request;
    },
    closeRequest(value: RestRequest){
      remove(this.openedRestRequest, (x: RestRequest | IRestCollection) => x.id == value.id);
      if (this.openedRestRequest.length > 0){
        this.activeRestRequest = this.openedRestRequest[this.openedRestRequest.length -1];
      }
    },
    addRestRequest(value: string, isSaved?: boolean){
      const request: RestRequest = {
        id: uid(),
        name: value,
        isOpen: true,
        isActive: false,
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
      return new RestCollection({
        id: uid(),
        name: value,
        isOpen: false,
        isActive: false,
        requests: [],
        isLocal: true,
        isSaved: true,
        isCollection: true,
        childs: [],

      });
    },
    addRequestOnCollection(request: RestRequest, collection: IRestCollection){
      collection.requests.push(request);
    },
    addFolderOnCollection(value: IRestCollection, parent: IRestCollection){
      parent.childs.push(value);
    },
    cloneAndAddToOpenedRequest(value: RestRequest | IRestCollection){
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

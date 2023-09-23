import { defineStore } from 'pinia'
import {RestCollection, RestRequest} from "src/models/model";
import remove from 'lodash.remove';

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
      activeRestRequest: ""
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
    }
  }

})

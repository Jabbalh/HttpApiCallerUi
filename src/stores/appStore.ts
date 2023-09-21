import { defineStore } from 'pinia'
import {RestCollection} from "src/models/model";

export interface IAppStore {
  restCollection: RestCollection[],
  currentRestCollection: RestCollection | undefined,
  activeRestRequest: string
}
export const useAppStore = defineStore('app', {
  state: (): IAppStore => {
    return {
      restCollection: [],
      currentRestCollection: undefined,
      activeRestRequest: ""
    }
  },
})

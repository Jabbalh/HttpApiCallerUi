import {defineStore} from "pinia";
import {AppEnvironnement} from "src/models/model";

export interface IEnvStore {
  Global: AppEnvironnement[];
  AppEnvironnement: AppEnvironnement[];
  Current: AppEnvironnement | null;
}

export const useEnvStore = defineStore('env', {
  state: (): IEnvStore => {
    return {
      Global: [],
      AppEnvironnement: [],
      Current: null
    }
  }
});

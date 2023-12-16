import { defineStore } from 'pinia';
import { AppEnvironnement } from 'src/models/model';

export interface IEnvStore {
  Global: AppEnvironnement;
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
  },
  actions: {
    addNewEnv(value: AppEnvironnement) {
      this.AppEnvironnement.push(value);
    },
    editEnv(newValue: AppEnvironnement) {

      const result = this.AppEnvironnement.find(x => newValue.id == x.id);
      if (result) {
        const index = this.AppEnvironnement.indexOf(result);
        if (index >= 0) {
          this.AppEnvironnement[index] = newValue
        }
      }

    },
    deleteEnvironnement(value: AppEnvironnement) {
      const index = this.AppEnvironnement.indexOf(value)
      this.AppEnvironnement.splice(index, 1);


    }

  }

}
);

import {defineStore} from 'pinia';
import {AppEnvironnement} from 'src/models/model';

export interface IEnvStore {
  Global: AppEnvironnement;
  AppEnvironnement: AppEnvironnement[];
  Current: AppEnvironnement | null;
}

export const useEnvStore = defineStore('env', {
  state: (): IEnvStore => {
    return {
      Global: {
        name: 'Global',
        values: []
      },
      AppEnvironnement: [],
      Current: null
    }
  },
  actions: {
    /**
     * Modification ou ajout d'une variable d'environnement
     * @param key
     * @param value
     */
    addEnvValue: function (key: string, value: string) {
      if (this.Current) {
        const env = this.Current.values.find(x => x.key == key);
        if (env){
          env.value = value;
        } else {
          this.Current.values.push({
            key: key,
            value: value,
            active: true
          });
        }
      }
    },
    /**
     * Renvoi la valeur d'une variable d'environnement
     * @param key
     */
    getEnvValue: function(key: string) {
      if (this.Current) {
        return this.Current.values.find(x => x.key == key)?.value ?? "";
      }
      return "";
    },
    setGlovalEnvValue: function(key: string, value: string) {
      const env = this.Global.values.find(x => x.key == key);
      if (env) {
        env.value = value;
      } else {
        this.Global.values.push({
          key: key,
          value: value,
          active: true
        });
      }
    },
    getGlobalValue: function(key: string){
      return this.Global.values.find(x => x.key == key)?.value ?? "";
    }
  }
});

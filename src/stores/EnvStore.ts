import { defineStore } from 'pinia';
import { AppEnvironnement } from 'src/models/model';
import { uid } from "quasar";

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
        id: uid(),
        values: []
      },
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
          this.AppEnvironnement[index] = newValue;
          // Traitement du courant
          if (this.Current && this.Current.id == newValue.id) {
            this.Current = newValue;
          }
        }
      }

    },
    deleteEnvironnement(value: AppEnvironnement) {
      const index = this.AppEnvironnement.indexOf(value)
      this.AppEnvironnement.splice(index, 1);
    },
    /**
     * Modification ou ajout d'une variable d'environnement
     * @param key
     * @param value
     */
    addEnvValue: function (key: string, value: string) {
      if (this.Current) {
        const env = this.Current.values.find(x => x.entry.key == key);
        if (env) {
          env.entry.value = value;
        } else {
          this.Current.values.push({
            entry: {
              key: key,
              value: value,
              active: true
            },
            id: 0
          });
        }
        // On modifie aussi la liste des environnements
        const copy = this.AppEnvironnement.find(x => x.name == this.Current!.name);
        if (copy) {
          this.AppEnvironnement[this.AppEnvironnement.indexOf(copy)] = this.Current;
        }
      }
    },
    /**
     * Renvoi la valeur d'une variable d'environnement
     * @param key
     */
    getEnvValue: function (key: string) {
      if (this.Current) {
        return this.Current.values.find(x => x.entry.key == key)?.entry.value ?? "";
      }
      return "";
    },
    setGlovalEnvValue: function (key: string, value: string) {
      const env = this.Global.values.find(x => x.entry.key == key);
      if (env) {
        env.entry.value = value;
      } else {
        this.Global.values.push({
          entry: {
            key: key,
            value: value,
            active: true
          },
          id: 0
        });
      }
    },
    getGlobalValue: function (key: string) {
      return this.Global.values.find(x => x.entry.key == key)?.entry.value ?? "";
    }

  }
});

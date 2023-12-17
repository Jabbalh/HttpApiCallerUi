import { useEnvStore } from 'stores/EnvStore';
import {AppEnvironnement, RestRequestParameters} from 'src/models/model';

export const ENV_REGEXT = /<<([^>]*)>>/g;

const useParseEnv = function () {
  /**
   * Gestion des variables dans les chaines
   * @param value
   * @param envs
   */
  const parseEnv = (value: string, envs: RestRequestParameters[] | undefined) => {
    return decodeURI(encodeURI(value)).replace(ENV_REGEXT, (v, k) => {
      return envs?.find(x => x.entry.key == k)?.entry.value ?? ''
    });
  }

  const addToSet = (result: Set<AppEnvironnement>, values?: AppEnvironnement) => {
    if (values) {
      result.add(values);
    }
  }

  const computedEnv = () => {
    const appEnv = useEnvStore();
    const selected = appEnv.Current ?? undefined;
    const global = appEnv.Global;

    const result = new Set<AppEnvironnement>();
    addToSet(result, selected);
    addToSet(result, global);

    return Array.from(result.values());
  }

  return {
    parseEnv,
    computedEnv
  }
}

export default useParseEnv;

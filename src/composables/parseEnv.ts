import {RestRequestParameters} from "src/models/model";

export const ENV_REGEXT = /<<([^>]*)>>/g;

const useParseEnv = function() {

  /**
   * Gestion des variables dans les chaines
   * @param value
   * @param envs
   */
  const parseEnv = (value: string, envs: RestRequestParameters[] | undefined ) => {
    return decodeURI(encodeURI(value)).replace(ENV_REGEXT,(v, k) => {
      return envs?.find(x => x.entry.key == k)?.entry.value ?? ''
    });
  }
  return {
    parseEnv
  }
}

export default useParseEnv;

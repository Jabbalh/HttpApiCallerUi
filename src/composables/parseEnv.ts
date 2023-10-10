export const ENV_REGEXT = /<<([^>]*)>>/g;

const useParseEnv = function() {

  /**
   * Gestion des variables dans les chaines
   * @param value
   * @param envs
   */
  const parseEnv = (value: string, envs: {key: string, value: string}[] | undefined ) => {
    return decodeURI(encodeURI(value)).replace(ENV_REGEXT,(v, k) => {
      return envs?.find(x => x.key == k)?.value ?? ''
    });
  }
  return {
    parseEnv
  }
}

export default useParseEnv;

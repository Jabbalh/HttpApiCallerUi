
import { templateSettings, template } from "lodash";

const ENV_REGEXT = /<<([^>]*)>>/g;

const useParseEnv = function() {

  const parseEnv = (value: string, envs: {key: string, value: string}[] | undefined ) => {
    templateSettings.interpolate = ENV_REGEXT;
    const compiled = template(value);

    const obj = {};
    for (const item of envs ?? []){
      Object.defineProperty(obj,item.key, {
        value: item.value,
        writable: false,
      });
    }

    const result =  compiled(obj);
    console.log("result", result);
    return result;
  }

  return {
    parseEnv
  }
}

export default useParseEnv;

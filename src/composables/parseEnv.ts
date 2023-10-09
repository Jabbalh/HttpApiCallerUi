
import {templateSettings, template} from "lodash";

const useParseEnv = function() {

  const parseEnv = (value: string) => {
    templateSettings.interpolate = /<<([^>]*)>>/g;
    const compiled = template(value);

    const result =  compiled({"rootUrl": "toto"});
    console.log("result", result);
    return result;
  }

  return {
    parseEnv
  }
}

export default useParseEnv;

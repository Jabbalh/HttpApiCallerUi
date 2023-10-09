import {RestRequest} from 'src/models/model';
import axios, {AxiosRequestConfig} from 'axios';
import useJson from "src/composables/Json";
import useParseEnv from "src/composables/parseEnv";
import {useEnvStore} from "stores/EnvStore";

/**
 * Permet d'envoyer une requete Http
 */
const useSendHttpRequest = function() {
  const sendRequest = async (request: RestRequest) => {
    try {
      const envApp = useEnvStore();
      // COntrcution et paramétrage de l'instance axios pour l'envoie de la requete
      const axiosRequest = axios.create();
      const params = new URLSearchParams();
      const parseEnv = useParseEnv();
      for (const item of request.parameter.filter((x => x.entry.active))){
        params.append(
          parseEnv.parseEnv(item.entry.key, envApp.Current?.values),
          parseEnv.parseEnv(item.entry.value, envApp.Current?.values));
      }
      console.log("request.body", request.body);
      const param: AxiosRequestConfig = {
        url: request.url,
        method: request.method.toLowerCase(),
        params: params,
        data: request.body
      };
      const result = await axiosRequest.request(param);
      request.response.response = useJson().cloneJson(JSON.stringify(result));
    } catch (error: unknown) {
      console.log('sendRequest error', error);
      request.response.response = 'ERROR';
    }
  }

  return { sendRequest }
}

// function buildValueWithEnv(value: string){
//
// }

export {
  useSendHttpRequest
}

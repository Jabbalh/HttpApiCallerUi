import {RestRequest, RestRequestParameters} from 'src/models/model';
import axios, {AxiosError, AxiosHeaders, AxiosRequestConfig, AxiosResponse} from 'axios';
import useJson from "src/composables/Json";
import useParseEnv from "src/composables/parseEnv";
import {useEnvStore} from "stores/EnvStore";
import cloneDeep from 'lodash/cloneDeep';
import * as E from "fp-ts/Either";
import {RestResponse} from "src/models/types/RestResponse";
import {map} from "lodash";

/**
 * Permet d'envoyer une requete Http
 */
const useSendHttpRequest = function() {
  const sendRequest = async (request: RestRequest) => {
    // Request clone
    const cloneRequest = cloneDeep(request);

    const envApp = useEnvStore();
    // COntrcution et paramétrage de l'instance axios pour l'envoie de la requete
    const params = new URLSearchParams();
    const { parseEnv } = useParseEnv();
    for (const item of cloneRequest.parameter.filter((x => x.entry.active))){
      params.append(
        parseEnv(item.entry.key, envApp.Current?.values),
        parseEnv(item.entry.value, envApp.Current?.values));
    }
    const param: AxiosRequestConfig = {
      url: parseEnv(cloneRequest.url, envApp.Current?.values),
      method: cloneRequest.method.toLowerCase(),
      headers: ensureHeader(cloneRequest.header),
      params: ensureParametre(cloneRequest.parameter),
      data: parseEnv(cloneRequest.body, envApp.Current?.values)
    };

    return effectiveRunRequest(param);
  }
  return { sendRequest }
}


const effectiveRunRequest = async (request: AxiosRequestConfig) => {
  try {
    const axiosRequest = axios.create();
    const res = await axiosRequest.request(request);
    return E.right(successRequest(res));
  } catch (error: any){
    return E.left(failRequest(error));
  }
}

export const pendingRequest = (): RestResponse => {
  return {
    type: 'loading',
    body: ''
  }
}

export const successRequest = (value: AxiosResponse): RestResponse => {
  const body = useJson().cloneJson(JSON.stringify(value));

  const contentLength = value.headers["content-length"]
    ? parseInt(value.headers["content-length"])
    : (value.data as ArrayBuffer).byteLength;
  console.log("value.data as ArrayBuffer", (value.data as ArrayBuffer).byteLength);
  return {
    type: "success",
    body: body,
    headers: map(value.headers, (x,y) => {
      return { key: x, value: y}
    }),
    meta: {
      responseDuration: 1,
      responseSize: contentLength
    },
    statusCode: value.status
  }
}

export const failRequest = (value: AxiosError): RestResponse => {
  return {
    type: 'fail',
    headers: map(value.response?.headers, (x,y) => {
      return { key: x, value: y}
    }),
    body: value.response?.data ? useJson().cloneJson(JSON.stringify(value.response?.data)) : '',
    statusCode: value.response?.status ?? 500
  }
}


const ensureParametre = (values: RestRequestParameters[]) => {
  const envApp = useEnvStore();
  const params = new URLSearchParams();
  const { parseEnv } = useParseEnv();
  for (const item of values.filter((x => x.entry.active))){
    params.append(
      parseEnv(item.entry.key, envApp.Current?.values),
      parseEnv(item.entry.value, envApp.Current?.values));
  }
  return params;
}

const ensureHeader = (values: RestRequestParameters[]) => {
  const { parseEnv } = useParseEnv();
  const envApp = useEnvStore();
  const headers: AxiosHeaders = new AxiosHeaders();
  for (const item of values.filter((x => x.entry.active))){
    headers[parseEnv(item.entry.key, envApp.Current?.values)] = parseEnv(item.entry.value, envApp.Current?.values);
  }
  return headers;
}

export {
  useSendHttpRequest
}

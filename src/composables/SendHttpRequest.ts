import {AppEnvitonnementValue, RestRequest, RestRequestParameters} from 'src/models/model';
import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseHeaders
} from 'axios';
import useJson from "src/composables/Json";
import useParseEnv from "src/composables/parseEnv";
import {useEnvStore} from "stores/EnvStore";
import cloneDeep from 'lodash/cloneDeep';
import * as E from 'fp-ts/Either';
import {RestResponse} from 'src/models/types/RestResponse';
import {map} from 'lodash';
import {RawAxiosResponseHeaders} from 'axios';
import {LANGUAGE} from 'src/models/Constantes';
import {useTypeVerify} from "src/composables/TypeVerify";
import {RestRequestBody} from "src/models/types/RestRequestBody";

/**
 * Permet d'envoyer une requete Http
 */
const useSendHttpRequest = function() {
  const sendRequest = async (request: RestRequest) => {
    // Request clone
    const cloneRequest = cloneDeep(request);

    const envApp = useEnvStore();
    const envs = envApp.Current?.values ?? [];
    const { parseEnv } = useParseEnv();

    const param: AxiosRequestConfig = {
      url: parseEnv(cloneRequest.url, envApp.Current?.values),
      method: cloneRequest.method.toLowerCase(),
      headers: ensureHeader(cloneRequest.header, cloneRequest.body.language, envs),
      params: ensureParameter(cloneRequest.parameter, envs),
      data: ensureBody(cloneRequest.body, envs)
    };

    return effectiveRunRequest(param);
  }
  return { sendRequest }
}

/**
 * Lance la requète et traite le résultat
 * @param request
 */
const effectiveRunRequest = async (request: AxiosRequestConfig) => {
  try {
    const { hasMetaResponse } = useTypeVerify();
    const start = new Date().getTime();
    const axiosRequest = axios.create();
    let download =0;
    request.onDownloadProgress =  (axiosProgressEvent) => {
      console.log('onDownloadProgress', axiosProgressEvent);
      download += axiosProgressEvent.bytes;
    }

    const res = await axiosRequest.request(request);
    const end = new Date().getTime();
    const result = successRequest(res);
    console.log("download", download);
    if (hasMetaResponse(result)){
      result.meta.responseDuration = end - start;
      result.meta.responseSize = download;
    }
    return E.right(result);

  } catch (error: any){
    return E.left(failRequest(error));
  }
}

/**
 * Résultat en attente
 */
export const pendingRequest = (): RestResponse => {
  return {
    type: 'loading',
    body: ''
  }
}

/**
 * Retour correct
 * @param value
 */
export const successRequest = (value: AxiosResponse): RestResponse => {
  const body = isJson(value.headers)
    ? useJson().cloneJson(JSON.stringify(value.data))
    : value.data;

  const contentLength = value.headers['content-length']
    ? parseInt(value.headers['content-length'])
    : (value.data as ArrayBuffer).byteLength;
  return {
    type: 'success',
    body: body,
    headers: map(value.headers, (x,y) => {
      return { key: x, value: y}
    }),
    language: determineLanguage(value.headers),
    meta: {
      responseDuration: 1,
      responseSize: contentLength
    },
    statusCode: value.status
  }
}

const isJson = (header: RawAxiosResponseHeaders | AxiosResponseHeaders) => {
  return /\bjson\b/i.test(header['content-type']);
}

const isXml = (header: RawAxiosResponseHeaders | AxiosResponseHeaders) => {
  return /\bxml\b/i.test(header['content-type']);
}

const isHtml = (header: RawAxiosResponseHeaders | AxiosResponseHeaders) => {
  return /\bhtml\b/i.test(header['content-type']);
}

const determineLanguage = (header: RawAxiosResponseHeaders | AxiosResponseHeaders) => {
  if (isJson(header)){
    return LANGUAGE.applicationJson;
  } else if (isXml(header)) {
    return LANGUAGE.applicationXml;
  } else if (isHtml(header)) {
    return LANGUAGE.textHtml
  }
  return '';
}

/**
 * Retour en erreur
 * @param value
 */
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

const ensureBody = (value?: RestRequestBody, envs?: AppEnvitonnementValue[]) => {
  if (value && value.language != LANGUAGE.nothing){
    const { parseEnv } = useParseEnv();
    const { isRestRequestParameters } = useTypeVerify()

    if (isRestRequestParameters(value.body)){
      return ensureMultiPartForm(value.body);
    } else if (value.language != LANGUAGE.nothing){
      return parseEnv(value.body, envs);
    }
  }
  return '';
}

/**
 * Vérification et traitement des paramètres
 * @param values
 * @param envs
 */
const ensureMultiPartForm = (values: RestRequestParameters[], envs?: AppEnvitonnementValue[]) => {
  const params = new FormData();
  const { parseEnv } = useParseEnv();
  for (const item of values.filter((x => x.entry.active))){
    params.append(
      parseEnv(item.entry.key, envs),
      parseEnv(item.entry.value, envs));
  }
  return params;
}


/**
 * Vérification et traitement des paramètres
 * @param values
 * @param envs
 */
const ensureParameter = (values: RestRequestParameters[], envs?: AppEnvitonnementValue[]) => {
  const params = new URLSearchParams();
  const { parseEnv } = useParseEnv();
  for (const item of values.filter((x => x.entry.active))){
    params.append(
      parseEnv(item.entry.key, envs),
      parseEnv(item.entry.value, envs));
  }
  return params;
}

/**
 * Vérification et traitement des entêtes
 * @param values
 * @param language
 * @param envs
 */
const ensureHeader = (values: RestRequestParameters[], language: string, envs?: AppEnvitonnementValue[]) => {
  const { parseEnv } = useParseEnv();
  const headers: AxiosHeaders = new AxiosHeaders();
  for (const item of values.filter((x => x.entry.active))){
    headers[parseEnv(item.entry.key, envs)] = parseEnv(item.entry.value, envs);
  }

  if (language != LANGUAGE.nothing){
    headers['Content-type'] = language;
  }
  console.log('header', headers);
  return headers;
}

export {
  useSendHttpRequest
}

import {
  AppEnvitonnementValue,
  IRestCollection,
  RestRequest,
  RestRequestAuth,
  RestRequestParameters
} from 'src/models/model';
import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseHeaders,
  RawAxiosResponseHeaders
} from 'axios';
import useJson from 'src/composables/Json';
import useParseEnv from 'src/composables/parseEnv';
import cloneDeep from 'lodash/cloneDeep';
import * as E from 'fp-ts/Either';
import {RestResponse} from 'src/models/types/RestResponse';
import {map} from 'lodash';
import {API_KEY_HEADERS, API_KEY_QUERY_PARAMS, KEY_AUTH, LANGUAGE} from 'src/models/Constantes';
import {useTypeVerify} from 'src/composables/TypeVerify';
import {RestRequestBody} from 'src/models/types/RestRequestBody';
import {useAppStore} from 'stores/appStore';
import {defaultAuth} from 'src/helpers/DefaultTypeUtils';
import useRequestUtils from 'src/composables/RequestUtils';
import { runSandbox } from 'src/sandbox/SandboxTestJs';


/**
 * Permet d'envoyer une requete Http
 */
const useSendHttpRequest = function() {
  const appStore = useAppStore();
  const { findParentCollectionById, findParentCollectionByIdCollection } = useRequestUtils();
  const sendRequest = async (request: RestRequest) => {
    // Request clone
    const cloneRequest = cloneDeep(request);
    const authorization = findFirstAuthorization(cloneRequest.id, appStore.restCollection, true, cloneRequest.authorization) ?? defaultAuth;

    const { computedEnv, parseEnv } = useParseEnv();
    const envs = computedEnv();
    const finalEnv: AppEnvitonnementValue[] = [];
    for (const item of envs){
      finalEnv.push(...item.values);
    }
    const param: AxiosRequestConfig = {
      url: parseEnv(cloneRequest.url, finalEnv),
      method: cloneRequest.method.toLowerCase(),
      headers: ensureAuth(ensureHeader(cloneRequest.header, cloneRequest.body.language, finalEnv), authorization, finalEnv),
      params: ensureAuthQueryParams(ensureParameter(cloneRequest.parameter, finalEnv), authorization, finalEnv),
      data: ensureBody(cloneRequest.body, finalEnv)
    };

    return effectiveRunRequest(param, request.testRequest ?? '');
  }

  const findFirstAuthorization = (requestId: string, values: IRestCollection[], findByRequestId: boolean, auth?: RestRequestAuth): RestRequestAuth | undefined => {
    if (auth && auth.type != KEY_AUTH.NONE){
      return auth;
    }
    const parent = findByRequestId ? findParentCollectionById(values, requestId) : findParentCollectionByIdCollection(values, requestId);

    if (parent){
      return findFirstAuthorization(parent.id, values, false, parent.authorization);
    }
    return undefined;
  }

  return { sendRequest }
}



/**
 * Lance la requète et traite le résultat
 * @param request
 * @param testScript
 */
const effectiveRunRequest = async (request: AxiosRequestConfig, testScript: string) => {
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
    if (hasMetaResponse(result)){
      result.meta.responseDuration = end - start;
      result.meta.responseSize = download;
    }

    runSandbox(testScript ?? '', res);

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
    language: checkLanguage(value.headers),
    meta: {
      responseDuration: 1,
      responseSize: contentLength
    },
    statusCode: value.status
  }
}

/**
 * Check if content is json
 * @param header
 */
const isJson = (header: RawAxiosResponseHeaders | AxiosResponseHeaders) => {
  return isContentTypeIsSomething(/\bjson\b/i, header);
}

/**
 * Check if content is Xml
 * @param header
 */
const isXml = (header: RawAxiosResponseHeaders | AxiosResponseHeaders) => {
  return isContentTypeIsSomething(/\bxml\b/i, header);
}

/**
 * Test if sentence is Html
 * @param header
 */
const isHtml = (header: RawAxiosResponseHeaders | AxiosResponseHeaders) => {
  return isContentTypeIsSomething(/\bhtml\b/i, header);
}

/**
 * Check content with regexp
 * @param regex
 * @param header
 */
const isContentTypeIsSomething = (regex: RegExp, header: RawAxiosResponseHeaders | AxiosResponseHeaders) => {
  return regex.test(header['content-type']);
}

/**
 * Check and obtain language
 * @param header
 */
const checkLanguage = (header: RawAxiosResponseHeaders | AxiosResponseHeaders) => {
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

/**
 * Vérification du Body
 * @param value
 * @param envs
 */
const ensureBody = (value?: RestRequestBody, envs?: AppEnvitonnementValue[]) => {
  if (value && value.language != LANGUAGE.nothing){
    const { parseEnv } = useParseEnv();
    const { isRestRequestParameters } = useTypeVerify()

    if (isRestRequestParameters(value.body)){
      return ensureMultiPartForm(value.body, value.language, envs);
    } else if (value.language != LANGUAGE.nothing){
      return parseEnv(value.body, envs);
    }
  }
  return '';
}

/**
 * Vérification et traitement des paramètres
 * @param values
 * @param language
 * @param envs
 */
const ensureMultiPartForm = (values: RestRequestParameters[], language: string, envs?: AppEnvitonnementValue[]) => {
  const params:  URLSearchParams | FormData = language == LANGUAGE.multiPartFormData ?  new FormData() : new URLSearchParams();
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
  for (const item of values.filter((x => x.entry.active && x.entry.key))){
    params.append(
      parseEnv(item.entry.key, envs),
      parseEnv(item.entry.value, envs));
  }
  return params;
}

/**
 * Check for Authorization
 * @param headers
 * @param auth
 * @param envs
 */
const ensureAuth = (headers: AxiosHeaders, auth: RestRequestAuth, envs?: AppEnvitonnementValue[]) => {
  switch (auth.type){
    case KEY_AUTH.BASIC:
      populateBasicAuth(headers, auth, envs);
      break;
    case KEY_AUTH.BEARER:
      populateBearerAuth(headers, auth, envs);
      break;
    case KEY_AUTH.APIKEY:
      populateApiKeyAuth(headers, auth, envs);
      break;
    case KEY_AUTH.OAUTH2:
      populateOauthAuth(headers, auth, envs);
      break;
  }
  return headers;
}

/**
 * Check for Auth ApiKey QueryParams
 * @param params
 * @param auth
 * @param envs
 */
const ensureAuthQueryParams = (params: URLSearchParams, auth: RestRequestAuth, envs?: AppEnvitonnementValue[]) => {
  const { parseEnv } = useParseEnv();
  if (auth.type == KEY_AUTH.APIKEY && auth.passBy == API_KEY_QUERY_PARAMS){
    params.append(parseEnv(auth.key, envs), parseEnv(auth.value, envs));
  }
  return params;
}

/**
 * Check for Basic Authorization
 * @param headers
 * @param auth
 * @param envs
 */
const populateBasicAuth = (headers: AxiosHeaders, auth: RestRequestAuth, envs?: AppEnvitonnementValue[]) => {
  const { parseEnv } = useParseEnv();
  const base64  = btoa(parseEnv(auth.key, envs) +':' + parseEnv(auth.value, envs));
  headers['Authorization'] = `Basic ${base64}`;
}

/**
 * Check for Bearer Authorization
 * @param headers
 * @param auth
 * @param envs
 */
const populateBearerAuth = (headers: AxiosHeaders, auth: RestRequestAuth, envs?: AppEnvitonnementValue[]) => {
  const { parseEnv } = useParseEnv();
  headers['Authorization'] = `Bearer ${parseEnv(auth.token, envs)}`;
}

/**
 * Check for ApiKey header Authorization
 * @param headers
 * @param auth
 * @param envs
 */
const populateApiKeyAuth = (headers: AxiosHeaders, auth: RestRequestAuth, envs?: AppEnvitonnementValue[]) => {
  const { parseEnv } = useParseEnv();
  if (auth.passBy == API_KEY_HEADERS){
    headers[parseEnv(auth.key, envs)] = parseEnv(auth.value, envs);
  }
}

/**
 * Check for Oauth Authorization
 * @param headers
 * @param auth
 * @param envs
 */
const populateOauthAuth = (headers: AxiosHeaders, auth: RestRequestAuth, envs?: AppEnvitonnementValue[]) => {
  const { parseEnv } = useParseEnv();
  headers[parseEnv(auth.key, envs)] = parseEnv(auth.value, envs);
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
  for (const item of values.filter((x => x.entry.active && x.entry.key))){
    headers[parseEnv(item.entry.key, envs)] = parseEnv(item.entry.value, envs);
  }
  if (language != LANGUAGE.nothing){
    headers['Content-type'] = language;
  }
  return headers;
}

export {
  useSendHttpRequest
}

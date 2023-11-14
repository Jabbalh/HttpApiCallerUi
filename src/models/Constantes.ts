export const REST_METHODS: string[] = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'HEAD',
  'CONNECT',
  'OPTIONS',
  'TRACE'
];
export const LANGUAGE = {
  nothing: 'Nothing',
  applicationJson: 'application/Json',
  applicationXml: 'application/Xml',
  applicationFormUrlEncoded: 'application/x-www-form-urlencoded',
  multiPartFormData: 'multipart/form-data',
  textPlain: 'text/plain',
  textHtml: 'test/html'
}

export const OPTIONS_LANGUAGE = [
  LANGUAGE.nothing,
  LANGUAGE.applicationJson,
  LANGUAGE.applicationXml,
  LANGUAGE.applicationFormUrlEncoded,
  LANGUAGE.multiPartFormData,
  LANGUAGE.textPlain,
  LANGUAGE.textHtml
];

export const isRawBody = (value: string) => {
  return value == LANGUAGE.applicationJson
    || value == LANGUAGE.applicationXml
    || value == LANGUAGE.textPlain
    || value == LANGUAGE.textHtml
};

export enum KEY_AUTH {
  NONE,
  BASIC,
  BEARER,
  OAUTH2,
  APIKEY

}

export const API_KEY_HEADERS = 'Headers';
export const API_KEY_QUERY_PARAMS = 'Query params';

export const OPTIONS_AUTH = [
  { value: KEY_AUTH.NONE, label:'None' },
  { value: KEY_AUTH.BASIC, label:'Basic Auth' },
  { value: KEY_AUTH.BEARER, label:'Bearer Token' },
  { value: KEY_AUTH.OAUTH2, label:'OAuth 2.0' },
  { value: KEY_AUTH.APIKEY, label:'API Key' }
]

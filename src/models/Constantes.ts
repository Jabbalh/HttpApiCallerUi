export const REST_METHODS: string[] = [ 'GET', 'POST', 'OPTION' ];
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

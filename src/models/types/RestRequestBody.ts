export type RestRequestBody =
  {
  type: 'application/Json' | 'application/Xml' | 'text/plain' | 'test/html',
  body: string,
  language: string
}
//   | {
//   type: 'application/x-www-form-urlencoded' | 'multipart/form-data',
//   parameters: RestRequestParameters[],
//   body: string,
//   language: string
// }

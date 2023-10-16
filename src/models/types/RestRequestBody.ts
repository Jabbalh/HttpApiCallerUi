import {RequestParameter} from "src/models/types/RestResponse";

export type RestRequestBody =
  | {
  type: 'application/Json' | 'application/Xml' | 'text/plain' | 'test/html',
  body: string,
  language: string
}
  | {
  type: 'application/x-www-form-urlencoded' | 'multipart/form-data',
  parameters: RequestParameter[]
  language: string
}

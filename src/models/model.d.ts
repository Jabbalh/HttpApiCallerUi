import { RestResponse } from "src/models/types/RestResponse";
import { RestRequestBody } from "src/models/types/RestRequestBody";
import { KEY_AUTH } from "src/models/Constantes";

export interface IRestCollection {
  id: string,
  isOpen: boolean,
  isActive: boolean,
  isCollection: boolean,
  name: string,
  isSaved: boolean,
  authorization: RestRequestAuth,
  childs: IRestCollection[],
  isLocal: boolean
  requests: RestRequest[]
}



export interface RestRequest {
  id: string,
  name: string,
  method: string,
  url: string,
  isOpen: boolean,
  isSaved: boolean,
  isActive?: boolean,
  parameter: RestRequestParameters[],
  header: RestRequestParameters[],
  authorization: RestRequestAuth,
  body: RestRequestBody,
  response?: RestResponse
}

export interface RestRequestParameters {
  id: number,
  entry: {
    key: string,
    value: string,
    active: boolean
  }
}



export interface AppEnvironnement {
  id: string,
  name: string,
  values: RestRequestParameters[]
}


import { RestResponse } from "src/models/types/RestResponse";
import { RestRequestBody } from "src/models/types/RestRequestBody";

export interface RestCollection {
  id: string,
  isCollection: boolean,
  name: string,
  isSaved: boolean,
  childs: RestCollection[],
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
  parameter: RestRequestParameters[],
  header: RestRequestParameters[],
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
  name: string,
  values: RestRequestParameters[]
}


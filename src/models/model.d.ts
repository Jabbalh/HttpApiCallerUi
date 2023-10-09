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
  body: string,
  response: RestResponse
}

export interface RestRequestParameters {
  id: number,
  entry: {
    key: string,
    value: string,
    active:boolean
  }
}

export interface  RestResponse {
  response: string
}

export interface  RestResponseParametre {

}


export interface AppEnvironnement {
  name: string,
  values: AppEnvitonnementValue[]
}

export interface AppEnvitonnementValue {
  key: string,
  value: string,
  active: boolean
}

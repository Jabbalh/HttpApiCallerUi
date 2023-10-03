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
  parameter: RestRequestParameters[]
  response: RestResponse
}

export interface RestRequestParameters {
  id: number,
  entry: {
    key: string,
    value: string
  }
}

export interface  RestResponse {
  response: string
}

export interface  RestResponseParametre {

}


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
  parameter: RestParameters
}

export interface RestParameters {

}


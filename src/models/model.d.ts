export interface RestCollection {
  id: string,
  name: string,
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
  parameter: RestParameters
}

export interface RestParameters {

}


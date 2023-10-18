import {RestRequestParameters} from "src/models/model";

export type RestRequestBody =
  {
    body: RestRequestParameters[] | string,
    language: string
  }

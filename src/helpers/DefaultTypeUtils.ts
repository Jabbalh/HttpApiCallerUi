import {KEY_AUTH} from "src/models/Constantes";
import {RestRequestAuth} from "src/models/model";

export const defaultAuth: RestRequestAuth =  {
  type: KEY_AUTH.NONE,
  value: '',
  accessTokenUrl: '',
  token: '',
  authorizationUrl: '',
  clientId: '',
  key: '',
  clientSecret: '',
  scope: '',
  passBy: '',
  openIdConfig: ''
}

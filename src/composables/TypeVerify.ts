import {IRestCollection, RestRequest, RestRequestParameters} from 'src/models/model';

/**
 * For verify type
 */
export const useTypeVerify = function() {

  /**
   * Vérfy if type is RestRequestParameter or string
   * @param values
   */
  const isRestRequestParameters = (values: any) : values is RestRequestParameters[] => {
    return !(typeof(values) == 'string');
  }

  const isRestRequest = (value: any) : value is RestRequest => !('isCollection' in value);

  const isRestCollection = (value: any) : value is IRestCollection => ('isCollection' in value);

  const hasStatusCode = (value?: any) : value is {statusCode: number} => {
    return (value && 'statusCode' in value);
  }

  const hasMetaResponse = (value?: any): value is { meta: {
      responseSize: number // in bytes
      responseDuration: number // in millis
    } } => {
    return value && 'meta' in value;
  }

  return {
    isRestRequestParameters,
    hasStatusCode,
    hasMetaResponse,
    isRestRequest,
    isRestCollection
  }

}

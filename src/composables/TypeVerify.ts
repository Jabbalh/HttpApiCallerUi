import {RestRequestParameters} from "src/models/model";

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
    hasMetaResponse
  }

}

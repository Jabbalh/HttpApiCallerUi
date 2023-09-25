import {RestRequest} from 'src/models/model';
import axios from 'axios';

/**
 * Permet d'envoyer une requete Http
 */
const useSendHttpRequest = function() {
  const sendRequest = async (request: RestRequest) => {
    try {
      // COntrcution et paramétrage de l'instance axios pour l'envoie de la requete
      const axiosRequest = axios.create();
      const result = await axiosRequest.request({
        url: request.url,
        method: request.method.toLowerCase()
      });
      console.log('result', result);
      request.response.response = JSON.stringify(result);
    } catch (error: unknown) {
      console.log('sendRequest error', error);
      request.response.response = 'ERROR';
    }
  }

  return { sendRequest }
}

export {
  useSendHttpRequest
}

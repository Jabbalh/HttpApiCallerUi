import {RestRequest} from "src/models/model";
import axios from "axios";

const useSendHttpRequest = function() {
  const sendRequest = async (request: RestRequest) => {
    try {
      const axiosRequest = axios.create();
      const result = await axiosRequest.request({
        url: request.url,
        method: request.method.toLowerCase()
      });
      console.log("result", result);
      request.response.response = JSON.stringify(result);
    } catch (error: any) {
      console.log('sendRequest error', error);
      request.response.response = 'ERROR';
    }
  }

  return { sendRequest }
}

export {
  useSendHttpRequest
}

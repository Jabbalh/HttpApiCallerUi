import {clone} from 'lodash';

const useJson = function() {
  const cloneJson = (value: string) => {
    try {
      return clone(JSON.stringify(JSON.parse(value), null, '\t'))
    } catch (ex: any){
      return value;
    }
  }
  return {
    cloneJson
  }
}


export default useJson;

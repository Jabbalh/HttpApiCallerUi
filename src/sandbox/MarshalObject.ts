import * as E from "fp-ts/Either";
import * as QuickJS from "quickjs-emscripten";

import {AxiosResponse} from "axios";

export const jsonToVm = function(vm: QuickJS.QuickJSContext, json: AxiosResponse){
  let jsonString = "";
  try {
    jsonString = JSON.stringify(json);
  } catch (error) {
    console.error("Error when stringify json", error);
    return E.left("Error when stringify json")
  }

  const jsonQuickJsString = vm.newString(jsonString);
  const jsonFunction = vm.getProp(vm.global,'JSON');
  const parseFunction = vm.getProp(jsonFunction, 'parse');

  const parseResultFunction = vm.callFunction(parseFunction,vm.undefined, jsonQuickJsString);

  if (parseResultFunction.error){
    console.error('call parse function failed', parseResultFunction.error.value);
    parseResultFunction.error.dispose();
    return E.left('call parse function failed')
  }

  const result = vm.unwrapResult(parseResultFunction);
  jsonQuickJsString.dispose();
  parseFunction.dispose();
  jsonFunction.dispose();

  return E.right(result);

}


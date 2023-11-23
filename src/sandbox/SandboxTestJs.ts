import * as qjs from "quickjs-emscripten"
import {Arena } from 'quickjs-emscripten-sync';
import {AxiosResponse} from "axios";
import {useEnvStore} from "stores/EnvStore";
//import {jsonToVm} from "src/sandbox/MarshalObject";
//import * as E from "fp-ts/Either";

export const runSandbox = async (script: string, axiosResult: AxiosResponse) => {
  const envApp = useEnvStore();
  const quickJs = await qjs.getQuickJS();
  const vm = quickJs.newContext();

  const arena = new Arena(vm, { isMarshalable: target => {
      if (target === window) return false;
      // complexity is a helper function to detect whether the object is heavy
      //if (complexity(target, 30) >= 30) return false;
      return true; // other objects are OK
    } });

  arena.expose({
    console: {
      log: console.log
    },
    hac: {
      setEnv: envApp.addEnvValue,
      getEnv: envApp.getEnvValue,
      setGlobalEnv: envApp.setGlovalEnvValue,
      getGlobalEnv: envApp.getGlobalValue,
      response: axiosResult
    }
  });

  arena.evalCode(script);
  arena.dispose();

  // const objectHandle = vm.newObject();
  //
  // const setEnvHandle = vm.newFunction('setEnv', (key: qjs.QuickJSHandle, value: qjs.QuickJSHandle) => {
  //   const keyValue = vm.dump(key);
  //   const valueVakue = vm.dump(value);
  //   if (envApp.Current){
  //     const env = envApp.Current.values.find(x => x.key == keyValue);
  //     if (env){
  //       env.value = valueVakue;
  //     }
  //   }
  // });
  //
  // console.log('axiosResult', axiosResult);
  // const marshalResponse = jsonToVm(vm, axiosResult);
  //
  // if (E.isLeft(marshalResponse)) {
  //   return E.left(marshalResponse.left);
  // }
  // console.log('marshall right ok')
  // vm.setProp(objectHandle, 'response',marshalResponse.right);
  // marshalResponse.right.dispose();
  // vm.setProp(objectHandle,'setEnv',setEnvHandle );
  // setEnvHandle.dispose();
  // vm.setProp(vm.global,'hac',objectHandle);
  // objectHandle.dispose();
  //
  // const result = vm.evalCode(script);
  //
  // if (result.error) {
  //   console.log("Execution failed:", vm.dump(result.error))
  //   result.error.dispose()
  // }

  vm.dispose()


}

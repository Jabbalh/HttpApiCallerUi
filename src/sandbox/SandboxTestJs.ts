import * as qjs from "quickjs-emscripten"
import {AxiosResponse} from "axios";
import {useEnvStore} from "stores/EnvStore";

export const runSandbox = async (script: string, axiosResult: AxiosResponse) => {

  const envApp = useEnvStore();

  const quickJs = await qjs.getQuickJS();
  const vm = quickJs.newContext();
  const objectHandle = vm.newObject();

  const setEnvHandle = vm.newFunction('setEnv', (key: qjs.QuickJSHandle, value: qjs.QuickJSHandle) => {
    const keyValue = vm.dump(key);
    const valueVakue = vm.dump(value);
    if (envApp.Current){
      const env = envApp.Current.values.find(x => x.key == keyValue);
      if (env){
        env.value = valueVakue;
      }
    }
  });

  const responseHandle = vm.newObject()


  //vm.setProp(objectHandle, 'respopnse',axiosResult);

  vm.setProp(objectHandle,'setEnv',setEnvHandle );
  setEnvHandle.dispose();
  vm.setProp(vm.global,'hac',objectHandle);
  objectHandle.dispose();

  const result = vm.evalCode(script);

  if (result.error) {
    console.log("Execution failed:", vm.dump(result.error))
    result.error.dispose()
  }

  vm.dispose()


}

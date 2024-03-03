import { setCssVar, useQuasar } from 'quasar'

const useTheme = function () {
  const q$ = useQuasar();
  const defaultTheme = function () {
    // src/css/quasar.variables.sass
    setCssVar('panel-secondary', '#F9F9F9');
    setCssVar('panel-primary', '#FFFFFF');
    setCssVar('panel-border', '#0000001E');
    setCssVar('panel-color-font', '#000000FF');
    setCssVar('cancel-color', '#262626');
    setCssVar('label-color', '#000000FF');
    q$.dark.set(false);
    q$.localStorage.set('theme', 'default');
  }
  const darkTheme = function () {
    setCssVar('panel-secondary', '#262626');
    setCssVar('panel-primary', '#212121');
    setCssVar('panel-border', '#5D5D5D66');
    setCssVar('panel-color-font', '#FFFFFFFF');
    setCssVar('cancel-color', '#FFFFFF');
    setCssVar('label-color', '#ABB2BFFF')
    q$.dark.set(true);
    q$.localStorage.set('theme', 'dark');
  }

  const updateAccent = (value: string) => {
    q$.localStorage.set('theme-accent', value);
  }

  const chooseTheme = new Map<string, () => void>(
    [
      ['default', defaultTheme],
      ['dark', darkTheme]
    ]
  );

  const initTheme = function () {
    const quasar = useQuasar();
    const th = quasar.localStorage.getItem<string>('theme') ?? 'default';
    const color = quasar.localStorage.getItem<string>('theme-accent') ?? '#8f1ca3'
    console.log('th', th);
    const exec_th = chooseTheme.get(th) ?? defaultTheme;
    setCssVar('accent', color);
    exec_th();
  }



  const isDark = () => q$.dark.isActive;


  return {
    updateAccent,
    initTheme,
    defaultTheme,
    darkTheme,
    isDark
  }
}




export default useTheme;

import {setCssVar, useQuasar} from 'quasar'

const useTheme = function() {
  const q$ = useQuasar();
  const defaultTheme = function() {
    // src/css/quasar.variables.sass
    setCssVar('header', '#ffffff');
    setCssVar('selected-text', '#3b3a3a');
    setCssVar('divider-color', '#dcdada');
    q$.dark.set(false);
    q$.localStorage.set('theme', 'default');
  }
  const darkTheme = function () {
    setCssVar('header', '#181818');
    setCssVar('selected-text', '#ffffff');
    setCssVar('divider-color', '#262626');
    q$.dark.set(true);
    q$.localStorage.set('theme', 'dark');
  }

  const chooseTheme = new Map<string, () => void>(
    [
      ['default', defaultTheme],
      ['dark', darkTheme ]
    ]
  );

  const initTheme = function() {
    const quasar = useQuasar();
    const th = quasar.localStorage.getItem<string>('theme') ?? 'default';
    const exec = chooseTheme.get(th) ?? defaultTheme;
    exec();
  }

  return {
    initTheme,
    defaultTheme,
    darkTheme
  }
}



export default useTheme;

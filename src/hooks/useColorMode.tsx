import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

/**
 * Persisted color mode hook.
 * Toggles `dark` class on `<body>` when mode is 'dark'.
 * Returns `[colorMode, setColorMode]`.
 */
const useColorMode = (): [string, (value: string | ((val: string) => string)) => void] => {
  const [colorMode, setColorMode] = useLocalStorage<string>('color-theme', 'light');

  useEffect(() => {
    const className = 'dark';
    const bodyClass = window.document.body.classList;

    if (colorMode === 'dark') {
      bodyClass.add(className);
    } else {
      bodyClass.remove(className);
    }
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;

'use client';
import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import { useAuth } from '@/hooks/useAuth';

const useColorMode = () => {
  const { user } = useAuth();
  const [colorMode, setColorMode] = useLocalStorage('color-theme', 'light');

  useEffect(() => {
    const className = 'dark';
    const bodyClass = window.document.body.classList;

    if (user && colorMode === 'dark') {
      bodyClass.add(className);
    } else {
      bodyClass.remove(className);
    }
  }, [user, colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;

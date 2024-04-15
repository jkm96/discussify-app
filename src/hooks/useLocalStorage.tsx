'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

type SetValue<T> = T | ((val: T) => T);

function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: SetValue<T>) => void] {
  const { user } = useAuth();

  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window !== 'undefined' && user) {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }

      return initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const valueToStore =
        typeof storedValue === 'function'
          ? storedValue(storedValue)
          : storedValue;

      if (typeof window !== 'undefined' && user) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue, user]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;

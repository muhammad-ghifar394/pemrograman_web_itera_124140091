import { useEffect, useState } from "react";

/**
 * State that is persisted to localStorage.
 * The lazy initializer also handles invalid or unavailable storage safely.
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Tidak dapat menyimpan data untuk "${key}".`, error);
    }
  }, [key, value]);

  return [value, setValue];
}

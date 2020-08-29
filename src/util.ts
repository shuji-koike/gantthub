import { useState, useCallback } from "react";

export function nonNull<T>(value: T | null): value is T {
  return value !== null;
}

export function useLocalStorage(name: string, enable: boolean = true) {
  const [state, setState] = useState(
    (enable && localStorage.getItem(name)) || ""
  );
  return [
    state,
    useCallback(
      function persistState(value: string) {
        if (enable) localStorage.setItem(name, value);
        setState(value);
      },
      [name, enable]
    ),
  ];
}

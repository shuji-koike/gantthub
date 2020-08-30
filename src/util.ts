import { useState, useCallback } from "react";

export function nonNull<T>(value: T | null): value is T {
  return value !== null;
}

export function useStorage(name: string, storage?: Storage) {
  const [state, setState] = useState(storage?.getItem(name) || "");
  return [
    state,
    useCallback(
      function persistState(value: string) {
        storage?.setItem(name, value);
        setState(value);
      },
      [name, storage]
    ),
  ];
}

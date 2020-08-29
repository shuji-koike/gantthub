import React, { useCallback } from "react";
import { useLocalStorage } from "../util";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> & {
  name: string;
  store?: boolean;
};

export const Input: React.FC<InputProps> = function ({
  name,
  placeholder = name,
  onChange,
  store = false,
  ...props
}) {
  const [value, setValue] = useLocalStorage(name, store);
  return (
    <input
      {...props}
      value={value as string}
      name={name}
      placeholder={placeholder}
      onChange={useCallback(
        e => {
          (setValue as (value: string) => {})(e.target.value);
          onChange?.(e);
        },
        [setValue, onChange]
      )}
    />
  );
};

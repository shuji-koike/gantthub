import React, { useState } from "react";

export const Config: React.FC = function () {
  return (
    <>
      <LocalStorageInput name="GITHUB_TOKEN" />
      <LocalStorageInput name="ZENHUB_TOKEN" />
    </>
  );
};

const LocalStorageInput: React.FC<{ name: string }> = function ({ name }) {
  const [value, setValue] = useState(localStorage.getItem(name));
  return (
    <input
      type="text"
      value={value || ""}
      name={name}
      placeholder={name}
      onChange={e => {
        localStorage.setItem(name, e.target.value);
        setValue(e.target.value);
      }}
    />
  );
};

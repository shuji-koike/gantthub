import React from "react";

export const Config: React.FC = function() {
  return (
    <div>
      <LocalStorageInput name="GITHUB_TOKEN" />
      <LocalStorageInput name="ZENHUB_TOKEN" />
    </div>
  );
};

const LocalStorageInput: React.FC<{ name: string }> = function({ name }) {
  const [value, setValue] = React.useState(localStorage.getItem(name) || "");
  return (
    <input
      type="text"
      value={value}
      name={name}
      placeholder={name}
      onChange={e => {
        localStorage.setItem(name, e.target.value);
        setValue(e.target.value);
      }}
    />
  );
};

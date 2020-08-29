import React from "react";
import { Input } from "./Input";

export const Config: React.FC = function () {
  return (
    <>
      <Input type="password" name="GITHUB_TOKEN" store />
    </>
  );
};

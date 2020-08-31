import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: React.ReactNode | null;
};

export const Button: React.FC<ButtonProps> = ({
  type = "button",
  label,
  ...props
}) => {
  return (
    <button {...props} type={type}>
      {label}
    </button>
  );
};

import { type FC } from "react";
import { Button as ShadcnButton } from "shadcn/ui";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ type, onClick, disabled, children }) => {
  return (
    <ShadcnButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full py-2 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700"
    >
      {children}
    </ShadcnButton>
  );
};

export default Button;

import { type FC } from "react";
import { Input as ShadcnInput } from "shadcn";

interface InputProps {
  id: string;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
}

const Input: FC<InputProps> = ({ id, type, value, onChange, placeholder, required }) => {
  return (
    <ShadcnInput
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full py-2 px-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default Input;

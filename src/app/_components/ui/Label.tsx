import { type FC } from "react";

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

const Label: FC<LabelProps> = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold text-gray-700">
      {children}
    </label>
  );
};

export default Label;

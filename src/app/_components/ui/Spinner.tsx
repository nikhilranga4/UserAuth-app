import { type FC } from "react";

const Spinner: FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="border-t-4 border-blue-500 border-solid rounded-full w-8 h-8 animate-spin"></div>
    </div>
  );
};

export default Spinner;

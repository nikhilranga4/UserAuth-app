import { type FC } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
}

const Toast: FC<ToastProps> = ({ message, type }) => {
  return (
    <div
      className={`fixed bottom-4 left-4 p-4 rounded-md text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;

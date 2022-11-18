import { toast } from "react-toastify";

interface NotificationOptions {
  type: "success" | "error" | "info" | "warning";
  message: string;

  // Optional
  autoClose?: number;
  position?:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left";
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  progress?: number;
  theme?: "light" | "dark";
}
export const notify = (args: NotificationOptions): void => {
  toast(args.message, args);
};

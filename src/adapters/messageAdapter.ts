import { toast } from "react-toastify";

export const showMessage = {
  success: (msg: string) => {
    toast.success(msg);
  },
  warn: (msg: string) => {
    toast.warn(msg);
  },
  warning: (msg: string) => {
    toast.warning(msg);
  },
  error: (msg: string) => {
    toast.error(msg);
  },
  info: (msg: string) => {
    toast.info(msg);
  },
  dismiss: () => {
    toast.dismiss();
  },
};

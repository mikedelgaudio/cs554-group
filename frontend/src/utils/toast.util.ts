import { toast } from "react-toastify";

export class ToastService {
  error(toastId: string, message?: string, autoClose = false) {
    toast.error(message || "Unexpected error occurred.", {
      position: "top-right",
      autoClose: autoClose ? 5000 : false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: toastId,
    });

    return toastId;
  }

  warn(toastId: string, message?: string, autoClose = false) {
    toast.warn(message || "Unexpected warning occurred.", {
      position: "top-right",
      autoClose: autoClose ? 5000 : false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: toastId,
    });
    return toastId;
  }

  success(toastId: string, message?: string, autoClose = false) {
    toast.success(message || "Action successful.", {
      position: "top-right",
      autoClose: autoClose ? 5000 : false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: toastId,
    });
    return toastId;
  }

  clear(toastId?: string) {
    if (!toastId) {
      toast.dismiss();
      return;
    }
    toast.dismiss(toastId);
  }
}

export const TOAST_SERVICE = new ToastService();

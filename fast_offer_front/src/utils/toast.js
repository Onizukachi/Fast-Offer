import { toast } from "react-toastify";

// types [info success warning error default]
export const showToast = (message, type='success') => {
  toast[type](message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    pauseOnFocusLoss: false,
    theme: "light",
  });
};

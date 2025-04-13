import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (type, message) => {
        if(type === 'success') {
          toast.success(message, {position: "bottom-right", autoClose: 2000});
        }else if(type === 'error') {
            toast.error(message, {position: "bottom-right", autoClose: 2000});
        }
}
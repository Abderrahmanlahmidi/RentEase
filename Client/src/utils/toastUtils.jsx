import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (type, message) => {
    const toastOptions = {
        position: "bottom-right",
        autoClose: 2000,
        className: 'font-sans text-sm',
        closeButton: false,
        hideProgressBar: true,
        style: {
            background: '#ffffff',
            color: '#374151',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }
    };

    if (type === 'success') {
        toast.success(message, {
            ...toastOptions,
            icon: <div className="text-green-600">✓</div>
        });
    } else if (type === 'error') {
        toast.error(message, {
            ...toastOptions,
            icon: <div className="text-red-600">✕</div>
        });
    }
};
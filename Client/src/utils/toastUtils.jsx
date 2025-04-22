import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaCheck, FaTimes, FaInfo, FaExclamation } from "react-icons/fa";

export const showToast = (type, message, options = {}) => {
  const baseOptions = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeButton: false,
    className: 'toast-message',
    style: {
      background: '#fff',
      color: '#000',
      border: '1px solid #e5e7eb',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      borderRadius: '0',
      padding: '12px 16px',
      fontSize: '14px',
      minWidth: '300px',
      margin: '0 0 8px 0'
    }
  };

  const icons = {
    success: <FaCheck className="mr-2" />,
    error: <FaTimes className="mr-2" />,
    info: <FaInfo className="mr-2" />,
    warning: <FaExclamation className="mr-2" />
  };

  const toastContent = (
    <div className="flex items-center">
      {icons[type]}
      <span>{message}</span>
    </div>
  );

  toast(toastContent, {
    ...baseOptions,
    ...options
  });
};

// Convenience methods
export const toastSuccess = (message, options) => showToast('success', message, options);
export const toastError = (message, options) => showToast('error', message, options);
export const toastInfo = (message, options) => showToast('info', message, options);
export const toastWarning = (message, options) => showToast('warning', message, options);
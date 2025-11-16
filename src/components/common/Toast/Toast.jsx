import { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="simple-toast-rect">
      <div className="toast-icon-rect">
        {type === "success" ? (
          <span className="toast-tick-rect">✓</span>
        ) : (
          <span className="toast-cross-rect">✕</span>
        )}
      </div>
      <span className="toast-message-rect">{message}</span>
    </div>
  );
};

export default Toast;

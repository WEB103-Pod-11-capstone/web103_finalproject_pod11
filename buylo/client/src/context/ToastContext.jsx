import React, { useState } from 'react';
import { ToastContext } from './ToastContext.js';

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    return id;
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const success = (message, duration = 3000) =>
    showToast(message, 'success', duration);
  const error = (message, duration = 4000) =>
    showToast(message, 'error', duration);
  const info = (message, duration = 3000) =>
    showToast(message, 'info', duration);
  const warning = (message, duration = 3500) =>
    showToast(message, 'warning', duration);

  return (
    <ToastContext.Provider
      value={{ showToast, removeToast, success, error, info, warning, toasts }}
    >
      {children}
    </ToastContext.Provider>
  );
};

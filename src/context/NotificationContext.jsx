import React, { createContext, useContext, useState, useCallback } from "react";

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
};

let notificationId = 0;

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback(
    (message, type = "info", duration = 5000) => {
      const id = ++notificationId;
      const notification = {
        id,
        message,
        type, // 'success', 'error', 'warning', 'info'
        duration,
      };

      setNotifications((prev) => [...prev, notification]);

      if (duration > 0) {
        setTimeout(() => {
          removeNotification(id);
        }, duration);
      }

      return id;
    },
    []
  );

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const success = useCallback(
    (message, duration) => {
      return addNotification(message, "success", duration);
    },
    [addNotification]
  );

  const error = useCallback(
    (message, duration) => {
      return addNotification(message, "error", duration);
    },
    [addNotification]
  );

  const warning = useCallback(
    (message, duration) => {
      return addNotification(message, "warning", duration);
    },
    [addNotification]
  );

  const info = useCallback(
    (message, duration) => {
      return addNotification(message, "info", duration);
    },
    [addNotification]
  );

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const value = {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    warning,
    info,
    clearAll,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

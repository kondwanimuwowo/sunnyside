import React from "react";
import { useNotification } from "@context/NotificationContext";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotification();

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const colors = {
    success: "bg-green-50 border-green-500 text-green-800",
    error: "bg-red-50 border-red-500 text-red-800",
    warning: "bg-yellow-50 border-yellow-500 text-yellow-800",
    info: "bg-blue-50 border-blue-500 text-blue-800",
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {notifications.map((notification) => {
        const Icon = icons[notification.type];
        const colorClass = colors[notification.type];

        return (
          <div
            key={notification.id}
            className={`flex items-start p-4 rounded-lg border-l-4 shadow-lg animate-slide-down ${colorClass}`}
          >
            <Icon className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
            <p className="flex-1 text-sm font-medium">{notification.message}</p>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-2 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationContainer;

import React, { useState, useEffect } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NotificationConfig, NotificationContainerProps } from '@/types';

const NotificationContainer: React.FC<NotificationContainerProps> = ({ notifications, onClose }) => {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className="pointer-events-auto animate-slide-down"
        >
          <div
            className={cn(
              "relative flex items-start gap-4 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-300",
              "bg-background-primary border-subtle",
            )}
          >
            <div
              className={cn(
                "shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-background-primary",
                notif.type === 'success' ? "text-success" : "text-error"
              )}
            >
              {notif.icon}
            </div>

            <div className="flex-1 pt-0.5">
              {notif.title && (
                <h3 className="font-semibold text-base mb-1">
                  {notif.title}
                </h3>
              )}
              {notif.message && (
                <p className="text-muted text-sm leading-relaxed">
                  {notif.message}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

let notificationIdCounter = 0;
let setNotificationsGlobal: React.Dispatch<React.SetStateAction<NotificationConfig[]>> | null = null;

export const useNotification = () => {
  const [notifications, setNotifications] = useState<NotificationConfig[]>([]);

  useEffect(() => {
    setNotificationsGlobal = setNotifications;
    return () => {
      setNotificationsGlobal = null;
    };
  }, []);

  const removeNotification = (id: number) => {
    setNotificationsGlobal?.((prev) => prev.filter((n) => n.id !== id));
  };

  const addNotification = (config: NotificationConfig) => {
    const id = ++notificationIdCounter;
    const newNotif = { ...config, id };

    setNotificationsGlobal?.((prev) => [...prev, newNotif]);

    if (config.duration !== 0) {
      setTimeout(() => {
        removeNotification(id);
      }, (config.duration || 4) * 1000);
    }

    return id;
  };

  const showSuccess = ({ title = 'Success', message, duration = 4 }: Partial<NotificationConfig>) => {
    addNotification({
      type: 'success',
      title,
      message,
      duration,
      icon: <Check size={20} strokeWidth={2.5} />,
      closable: true,
    });
  };

  const showError = ({ title = 'Error', message, duration = 4 }: Partial<NotificationConfig>) => {
    addNotification({
      type: 'error',
      title,
      message,
      duration,
      icon: <AlertCircle size={20} strokeWidth={2.5} />,
      closable: true,
    });
  };

  const destroy = (id?: number) => {
    if (id !== undefined) {
      removeNotification(id);
    } else {
      setNotificationsGlobal?.([]);
    }
  };

  const NotificationComponent = () => (
    <NotificationContainer
      notifications={notifications}
      onClose={removeNotification}
    />
  );

  return {
    showSuccess,
    showError,
    destroy,
    NotificationContainer: NotificationComponent,
  };
};
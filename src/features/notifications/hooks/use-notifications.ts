import { useEffect } from "react";
import { useNotificationStore } from "@/stores/notification-store";

export const useNotifications = () => {
  const {
    notifications,
    isLoading,
    error,
    fetchNotifications,
    createNotification,
    updateNotification,
    deleteNotification,
    publishNotification,
    clearError,
    fetchNotification,
    currentNotification,
    clearCurrentNotification,
  } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    isLoading,
    error,
    createNotification,
    updateNotification,
    deleteNotification,
    publishNotification,
    clearError,
    refetch: fetchNotifications,
    fetchNotification,
    currentNotification,
    clearCurrentNotification,
  };
};

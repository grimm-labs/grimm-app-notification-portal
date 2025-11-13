import { create } from "zustand";
import {
  Notification,
  CreateNotificationDto,
  UpdateNotificationDto,
} from "@/types";
import { notificationService } from "@/services/notification-service";
import { showSuccessNotification } from "@/services/api-client";

interface NotificationStore {
  notifications: Notification[];
  currentNotification: Notification | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchNotifications: () => Promise<void>;
  fetchNotification: (id: string) => Promise<Notification>;
  createNotification: (data: CreateNotificationDto) => Promise<void>;
  updateNotification: (
    id: string,
    data: UpdateNotificationDto,
  ) => Promise<Notification>;
  deleteNotification: (id: string) => Promise<void>;
  publishNotification: (id: string) => Promise<void>;
  clearError: () => void;
  clearCurrentNotification: () => void;
}

// Helper function to get error message
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return "An unknown error occurred";
};

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  currentNotification: null,
  isLoading: false,
  error: null,

  fetchNotifications: async () => {
    set({ isLoading: true, error: null });
    try {
      const notifications = await notificationService.getNotifications();
      set({ notifications, isLoading: false });
    } catch (error) {
      set({
        error: getErrorMessage(error),
        isLoading: false,
      });
    }
  },

  fetchNotification: async (id: string): Promise<Notification> => {
    set({ isLoading: true, error: null });
    try {
      const notification = await notificationService.getNotification(id);
      set({ currentNotification: notification, isLoading: false });
      return notification;
    } catch (error) {
      set({
        error: getErrorMessage(error),
        isLoading: false,
      });
      throw error;
    }
  },

  createNotification: async (data: CreateNotificationDto) => {
    set({ isLoading: true, error: null });
    try {
      await notificationService.createNotification(data);
      await get().fetchNotifications();
      showSuccessNotification("Notification created successfully");
    } catch (error) {
      const message = getErrorMessage(error);
      set({
        error: message,
        isLoading: false,
      });
      throw new Error(message);
    }
  },

  updateNotification: async (
    id: string,
    data: UpdateNotificationDto,
  ): Promise<Notification> => {
    set({ isLoading: true, error: null });
    try {
      const updatedNotification = await notificationService.updateNotification(
        id,
        data,
      );
      await get().fetchNotifications();
      set({ currentNotification: null });
      showSuccessNotification("Notification updated successfully");
      return updatedNotification;
    } catch (error) {
      const message = getErrorMessage(error);
      set({
        error: message,
        isLoading: false,
      });
      throw new Error(message);
    }
  },

  deleteNotification: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await notificationService.deleteNotification(id);
      await get().fetchNotifications();
      showSuccessNotification("Notification deleted successfully");
    } catch (error) {
      set({
        error: getErrorMessage(error),
        isLoading: false,
      });
    }
  },

  publishNotification: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await notificationService.publishNotification(id);
      await get().fetchNotifications();
      showSuccessNotification("Notification published successfully");
    } catch (error) {
      set({
        error: getErrorMessage(error),
        isLoading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
  clearCurrentNotification: () => set({ currentNotification: null }),
}));

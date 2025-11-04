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
  fetchNotification: (id: string) => Promise<void>;
  createNotification: (data: CreateNotificationDto) => Promise<void>;
  updateNotification: (
    id: string,
    data: UpdateNotificationDto,
  ) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  publishNotification: (id: string) => Promise<void>;
  clearError: () => void;
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

  fetchNotification: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const notification = await notificationService.getNotification(id);
      set({ currentNotification: notification, isLoading: false });
    } catch (error) {
      set({
        error: getErrorMessage(error),
        isLoading: false,
      });
    }
  },

  createNotification: async (data: CreateNotificationDto) => {
    set({ isLoading: true, error: null });
    try {
      await notificationService.createNotification(data);
      await get().fetchNotifications();
      showSuccessNotification("Notification créée avec succès");
    } catch (error) {
      const message = getErrorMessage(error);
      set({
        error: message,
        isLoading: false,
      });
      throw new Error(message);
    }
  },

  updateNotification: async (id: string, data: UpdateNotificationDto) => {
    set({ isLoading: true, error: null });
    try {
      await notificationService.updateNotification(id, data);
      await get().fetchNotifications();
      showSuccessNotification("Notification mise à jour avec succès");
    } catch (error) {
      set({
        error: getErrorMessage(error),
        isLoading: false,
      });
    }
  },

  deleteNotification: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await notificationService.deleteNotification(id);
      await get().fetchNotifications();
      showSuccessNotification("Notification supprimée avec succès");
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
      showSuccessNotification("Notification publiée avec succès");
    } catch (error) {
      set({
        error: getErrorMessage(error),
        isLoading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
}));

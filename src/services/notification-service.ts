import { apiClient } from "./api-client";
import {
  Notification,
  CreateNotificationDto,
  UpdateNotificationDto,
  Device,
} from "@/types";

export const notificationService = {
  async getNotifications(): Promise<Notification[]> {
    const response = await apiClient.get<Notification[]>("/notifications");
    return response.data;
  },

  async getNotification(id: string): Promise<Notification> {
    const response = await apiClient.get<Notification>(`/notifications/${id}`);
    return response.data;
  },

  async createNotification(data: CreateNotificationDto): Promise<Notification> {
    const response = await apiClient.post<Notification>("/notifications", data);
    return response.data;
  },

  async updateNotification(
    id: string,
    data: UpdateNotificationDto,
  ): Promise<Notification> {
    const response = await apiClient.put<Notification>(
      `/notifications/${id}`,
      data,
    );
    return response.data;
  },

  async deleteNotification(id: string): Promise<void> {
    await apiClient.delete(`/notifications/${id}`);
  },

  async publishNotification(id: string): Promise<Notification> {
    const response = await apiClient.put<Notification>(
      `/notifications/${id}/publish`,
    );
    return response.data;
  },

  async registerDeviceToken(
    token: string,
    platform: "ANDROID" | "IOS",
  ): Promise<Device> {
    const response = await apiClient.post<Device>(
      "/notifications/register-token",
      {
        token,
        platform,
      },
    );
    return response.data;
  },
};

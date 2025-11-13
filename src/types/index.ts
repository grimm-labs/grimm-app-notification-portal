export interface JsonObject {
  [key: string]: string | number | boolean | null | JsonObject | JsonObject[];
}

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonObject
  | JsonObject[];

export interface Notification {
  id: string;
  title: string;
  body: string;
  data?: JsonObject | null;
  ttl?: number | null;
  iosMessageSubtitle?: string | null;
  badgeCount?: number | null;
  androidChannelId?: string | null;
  status: "DRAFT" | "PUBLISHED";
  createdAt: string;
  updatedAt: string;
}

export interface Device {
  id: string;
  token: string;
  platform: "ANDROID" | "IOS";
  createdAt: string;
}

export interface CreateNotificationDto {
  title: string;
  body: string;
  data?: JsonObject;
  ttl?: number;
  iosMessageSubtitle?: string;
  badgeCount?: number;
  androidChannelId?: string;
}

export interface UpdateNotificationDto {
  title?: string;
  body?: string;
  data?: JsonObject;
  ttl?: number;
  iosMessageSubtitle?: string;
  badgeCount?: number;
  androidChannelId?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}

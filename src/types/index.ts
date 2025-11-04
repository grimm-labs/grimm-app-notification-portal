export interface Notification {
  id: string;
  title: string;
  body: string;
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
}

export interface UpdateNotificationDto {
  title?: string;
  body?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}

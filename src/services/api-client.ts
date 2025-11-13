import axios from "axios";
import { notifications } from "@mantine/notifications";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = "An error occurred";

    if (error.code === "ECONNREFUSED") {
      errorMessage =
        "Unable to connect to the API server. Please check that the server is running.";
    } else if (error.response) {
      errorMessage =
        error.response.data?.message || `Error ${error.response.status}`;
    } else if (error.request) {
      errorMessage = "No response from server";
    }

    notifications.show({
      title: "Error",
      message: errorMessage,
      color: "red",
    });

    return Promise.reject(error);
  },
);

export const showSuccessNotification = (message: string) => {
  notifications.show({
    title: "Success",
    message,
    color: "green",
  });
};

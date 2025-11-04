import axios from "axios";
import { notifications } from "@mantine/notifications";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour les erreurs amélioré avec Mantine notifications
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = "Une erreur est survenue";

    if (error.code === "ECONNREFUSED") {
      errorMessage =
        "Impossible de se connecter au serveur API. Vérifiez que le serveur est démarré.";
    } else if (error.response) {
      errorMessage =
        error.response.data?.message || `Erreur ${error.response.status}`;
    } else if (error.request) {
      errorMessage = "Aucune réponse du serveur";
    }

    notifications.show({
      title: "Erreur",
      message: errorMessage,
      color: "red",
      // Pas d'icône pour éviter les problèmes JSX
    });

    return Promise.reject(error);
  },
);

// Fonction utilitaire pour les succès
export const showSuccessNotification = (message: string) => {
  notifications.show({
    title: "Succès",
    message,
    color: "green",
    // Pas d'icône pour éviter les problèmes JSX
  });
};

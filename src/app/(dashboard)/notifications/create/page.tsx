"use client";

import { useRouter } from "next/navigation";
import { Stack, Title, Text, Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { NotificationForm } from "@/components/notifications/notification-form";
import { useNotificationStore } from "@/stores/notification-store";

export default function CreateNotificationPage() {
  const router = useRouter();
  const { createNotification, isLoading, error, clearError } =
    useNotificationStore();

  const handleSubmit = async (data: { title: string; body: string }) => {
    try {
      await createNotification(data);
      router.push("/notifications");
    } catch (error) {
      // L'erreur est gérée par le store
    }
  };

  const handleCancel = () => {
    router.push("/notifications");
  };

  return (
    <Stack gap="lg">
      <div>
        <Title order={1}>Créer une notification</Title>
        <Text c="dimmed" mt={4}>
          Remplissez les informations pour créer une nouvelle notification
        </Text>
      </div>

      {error && (
        <Alert
          variant="light"
          color="red"
          title="Erreur"
          icon={<IconAlertCircle />}
          withCloseButton
          onClose={clearError}
        >
          {error}
        </Alert>
      )}

      <NotificationForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
        submitButtonText="Créer la notification"
      />
    </Stack>
  );
}

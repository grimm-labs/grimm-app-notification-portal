"use client";

import { useState } from "react";
import { Stack, Group, Title, Text, Button, Alert } from "@mantine/core";
import { IconAlertCircle, IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useNotifications } from "@/features/notifications/hooks/use-notifications";
import { NotificationList } from "@/components/notifications/notification-list";

export default function NotificationsPage() {
  const {
    notifications,
    isLoading,
    error,
    deleteNotification,
    publishNotification,
  } = useNotifications();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    await deleteNotification(id);
    setDeleteConfirm(null);
  };

  const handlePublish = async (id: string) => {
    await publishNotification(id);
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <div>
          <Title order={1}>Gestion des notifications</Title>
          <Text c="dimmed" mt={4}>
            Créez et gérez les notifications push pour l&apos;application Grimm
          </Text>
        </div>

        <Button
          component={Link}
          href="/notifications/create"
          leftSection={<IconPlus size={16} />}
        >
          Nouvelle notification
        </Button>
      </Group>

      {error && (
        <Alert
          variant="light"
          color="red"
          title="Erreur"
          icon={<IconAlertCircle />}
        >
          {error}
        </Alert>
      )}

      <NotificationList
        notifications={notifications}
        isLoading={isLoading}
        onDelete={handleDelete}
        onPublish={handlePublish}
        deleteConfirm={deleteConfirm}
        setDeleteConfirm={setDeleteConfirm}
      />
    </Stack>
  );
}

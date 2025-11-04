"use client";

import { useState } from "react";
import { Stack, Group, Title, Text, Button, Alert, Modal } from "@mantine/core";
import { IconAlertCircle, IconPlus } from "@tabler/icons-react";
import { useNotifications } from "@/features/notifications/hooks/use-notifications";
import { useNotificationStore } from "@/stores/notification-store";
import { NotificationList } from "@/components/notifications/notification-list";
import { NotificationForm } from "@/components/notifications/notification-form";
import { Notification } from "@/types";

export default function NotificationsPage() {
  const {
    notifications,
    isLoading,
    error,
    deleteNotification,
    publishNotification,
    clearError,
  } = useNotifications();

  const {
    createNotification,
    updateNotification,
    currentNotification,
    fetchNotification,
    clearCurrentNotification,
  } = useNotificationStore();

  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async (id: string) => {
    await deleteNotification(id);
    setDeleteConfirm(null);
  };

  const handlePublish = async (id: string) => {
    await publishNotification(id);
  };

  const handleEdit = async (notification: Notification) => {
    if (notification.status === "DRAFT") {
      try {
        await fetchNotification(notification.id);
        setIsEditing(true);
        setModalOpened(true);
      } catch (error) {
        console.error("Error fetching notification:", error);
      }
    }
  };

  const handleCreate = () => {
    clearCurrentNotification();
    setIsEditing(false);
    setModalOpened(true);
  };

  const handleModalClose = () => {
    setModalOpened(false);
    setIsEditing(false);
    clearCurrentNotification();
    clearError();
  };

  const handleSubmit = async (data: { title: string; body: string }) => {
    try {
      if (isEditing && currentNotification) {
        await updateNotification(currentNotification.id, data);
      } else {
        await createNotification(data);
      }
      handleModalClose();
    } catch (error) {}
  };

  const publishedCount = notifications.filter(
    (n) => n.status === "PUBLISHED",
  ).length;
  const draftCount = notifications.filter((n) => n.status === "DRAFT").length;

  return (
    <>
      <Stack gap="lg">
        <Group justify="space-between">
          <div>
            <Title order={1}>Gestion des notifications</Title>
            <Text c="dimmed" mt={4}>
              Créez et gérez les notifications push pour l&apos;application
              Grimm
            </Text>
          </div>

          <Button leftSection={<IconPlus size={16} />} onClick={handleCreate}>
            Nouvelle notification
          </Button>
        </Group>

        {notifications.length > 0 && (
          <Group gap="lg">
            <Group gap="xs">
              <Text fw={500}>Total:</Text>
              <Text fw={700} c="blue">
                {notifications.length}
              </Text>
            </Group>
            <Group gap="xs">
              <Text fw={500}>Publiées:</Text>
              <Text fw={700} c="green">
                {publishedCount}
              </Text>
            </Group>
            <Group gap="xs">
              <Text fw={500}>Brouillons:</Text>
              <Text fw={700} c="orange">
                {draftCount}
              </Text>
            </Group>
          </Group>
        )}

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
          onEdit={handleEdit}
          deleteConfirm={deleteConfirm}
          setDeleteConfirm={setDeleteConfirm}
        />
      </Stack>

      <Modal
        opened={modalOpened}
        onClose={handleModalClose}
        title={
          isEditing ? "Modifier la notification" : "Créer une notification"
        }
        size="lg"
        centered
        padding="xl"
      >
        <NotificationForm
          onSubmit={handleSubmit}
          onCancel={handleModalClose}
          isLoading={isLoading}
          initialData={currentNotification || undefined}
          submitButtonText={
            isEditing ? "Modifier la notification" : "Créer la notification"
          }
        />
      </Modal>
    </>
  );
}

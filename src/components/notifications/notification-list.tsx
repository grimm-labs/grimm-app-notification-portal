import { Notification } from "@/types";
import { Stack, Skeleton, Text, Center } from "@mantine/core";
import { NotificationCard } from "./notification-card";

interface NotificationListProps {
  notifications: Notification[];
  isLoading: boolean;
  onDelete: (id: string) => void;
  onPublish: (id: string) => void;
  deleteConfirm: string | null;
  setDeleteConfirm: (id: string | null) => void;
}

export function NotificationList({
  notifications,
  isLoading,
  onDelete,
  onPublish,
  deleteConfirm,
  setDeleteConfirm,
}: NotificationListProps) {
  if (isLoading) {
    return (
      <Stack gap="md">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} height={120} radius="md" />
        ))}
      </Stack>
    );
  }

  if (notifications.length === 0) {
    return (
      <Center py="xl">
        <Stack align="center" gap="xs">
          <Text size="xl" c="dimmed">
            🔔
          </Text>
          <Text size="lg" fw={500} c="dimmed">
            Aucune notification
          </Text>
          <Text c="dimmed" ta="center">
            Commencez par créer votre première notification.
          </Text>
        </Stack>
      </Center>
    );
  }

  return (
    <Stack gap="md">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onDelete={onDelete}
          onPublish={onPublish}
          deleteConfirm={deleteConfirm}
          setDeleteConfirm={setDeleteConfirm}
        />
      ))}
    </Stack>
  );
}

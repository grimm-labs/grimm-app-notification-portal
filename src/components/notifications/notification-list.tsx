import { Notification } from "@/types";
import { Stack, Skeleton, Text, Center, Card } from "@mantine/core";
import { IconInbox } from "@tabler/icons-react";
import { NotificationCard } from "./notification-card";

interface NotificationListProps {
  notifications: Notification[];
  isLoading: boolean;
  onDelete: (id: string) => void;
  onPublish: (id: string) => void;
  onEdit: (notification: Notification) => void;
  deleteConfirm: string | null;
  setDeleteConfirm: (id: string | null) => void;
}

export function NotificationList({
  notifications,
  isLoading,
  onDelete,
  onPublish,
  onEdit,
  deleteConfirm,
  setDeleteConfirm,
}: NotificationListProps) {
  if (isLoading) {
    return (
      <Stack gap="md">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} height={150} radius="lg" />
        ))}
      </Stack>
    );
  }

  if (notifications.length === 0) {
    return (
      <Center py="xl">
        <Card withBorder shadow="sm" radius="lg" p="xl">
          <Stack align="center" gap="md" py="xl">
            <IconInbox size={48} color="#868e96" />
            <div>
              <Text size="xl" fw={600} c="dimmed" ta="center">
                Aucune notification
              </Text>
              <Text c="dimmed" ta="center" mt={4}>
                Commencez par créer votre première notification.
              </Text>
            </div>
          </Stack>
        </Card>
      </Center>
    );
  }

  return (
    <Stack gap="md">
      <Text size="sm" c="dimmed">
        {notifications.length} notification{notifications.length > 1 ? "s" : ""}{" "}
        au total
        {notifications.some((n) => n.status === "DRAFT") && (
          <>
            {" "}
            •{" "}
            <Text span c="orange">
              Les brouillons peuvent être modifiés
            </Text>
          </>
        )}
      </Text>
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onDelete={onDelete}
          onPublish={onPublish}
          onEdit={onEdit}
          deleteConfirm={deleteConfirm}
          setDeleteConfirm={setDeleteConfirm}
        />
      ))}
    </Stack>
  );
}

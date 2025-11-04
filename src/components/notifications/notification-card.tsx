import { Notification } from "@/types";
import {
  Card,
  Group,
  Text,
  Badge,
  Button,
  Stack,
  ActionIcon,
} from "@mantine/core";
import { IconSend, IconTrash } from "@tabler/icons-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface NotificationCardProps {
  notification: Notification;
  onDelete: (id: string) => void;
  onPublish: (id: string) => void;
  deleteConfirm: string | null;
  setDeleteConfirm: (id: string | null) => void;
}

export function NotificationCard({
  notification,
  onDelete,
  onPublish,
  deleteConfirm,
  setDeleteConfirm,
}: NotificationCardProps) {
  const isDraft = notification.status === "DRAFT";
  const isDeleteConfirm = deleteConfirm === notification.id;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Group justify="space-between" align="flex-start">
          <Text fw={500} size="lg">
            {notification.title}
          </Text>
          <Badge color={isDraft ? "yellow" : "green"} variant="light">
            {isDraft ? "Brouillon" : "Publiée"}
          </Badge>
        </Group>

        <Text c="dimmed" size="sm">
          {notification.body}
        </Text>

        <Group justify="space-between">
          <Text size="xs" c="dimmed">
            Créée le{" "}
            {format(new Date(notification.createdAt), "dd MMMM yyyy à HH:mm", {
              locale: fr,
            })}
          </Text>

          <Group gap="xs">
            {isDraft && (
              <Button
                leftSection={<IconSend size={16} />}
                variant="light"
                color="blue"
                size="sm"
                onClick={() => onPublish(notification.id)}
              >
                Publier
              </Button>
            )}

            {isDeleteConfirm ? (
              <Group gap="xs">
                <Button
                  leftSection={<IconTrash size={16} />}
                  variant="filled"
                  color="red"
                  size="sm"
                  onClick={() => onDelete(notification.id)}
                >
                  Confirmer
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setDeleteConfirm(null)}
                >
                  Annuler
                </Button>
              </Group>
            ) : (
              <ActionIcon
                variant="light"
                color="red"
                size="lg"
                onClick={() => setDeleteConfirm(notification.id)}
              >
                <IconTrash size={16} />
              </ActionIcon>
            )}
          </Group>
        </Group>
      </Stack>
    </Card>
  );
}

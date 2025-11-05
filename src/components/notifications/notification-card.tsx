import { Notification } from "@/types";
import {
  Card,
  Group,
  Text,
  Badge,
  Button,
  Stack,
  ActionIcon,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { IconSend, IconTrash, IconEdit } from "@tabler/icons-react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

interface NotificationCardProps {
  notification: Notification;
  onDelete: (id: string) => void;
  onPublish: (id: string) => void;
  onEdit: (notification: Notification) => void;
  deleteConfirm: string | null;
  setDeleteConfirm: (id: string | null) => void;
}

export function NotificationCard({
  notification,
  onDelete,
  onPublish,
  onEdit,
  deleteConfirm,
  setDeleteConfirm,
}: NotificationCardProps) {
  const theme = useMantineTheme();
  const isDraft = notification.status === "DRAFT";
  const isDeleteConfirm = deleteConfirm === notification.id;

  return (
    <Card
      padding="lg"
      radius="lg"
      withBorder
      style={{
        borderLeft: `4px solid ${isDraft ? theme.colors.yellow[5] : theme.colors.green[5]}`,
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      className="hover-card"
    >
      <Stack gap="md">
        <Group justify="space-between" align="flex-start">
          <div style={{ flex: 1 }}>
            <Text fw={600} size="lg" mb={4}>
              {notification.title}
            </Text>
            <Text c="dimmed" size="sm" style={{ lineHeight: 1.4 }}>
              {notification.body}
            </Text>
          </div>
          <Badge
            color={isDraft ? "yellow" : "green"}
            variant="light"
            size="lg"
            radius="sm"
          >
            {isDraft ? "Draft" : "Published"}
          </Badge>
        </Group>

        <Group justify="space-between" align="center">
          <Text size="xs" c="dimmed">
            Created on{" "}
            {format(
              new Date(notification.createdAt),
              "dd MMMM yyyy 'at' HH:mm",
              {
                locale: enUS,
              },
            )}
          </Text>

          <Group gap="xs">
            {isDraft ? (
              <>
                <Tooltip label="Edit notification">
                  <ActionIcon
                    variant="light"
                    color="blue"
                    size="lg"
                    onClick={() => onEdit(notification)}
                    radius="md"
                  >
                    <IconEdit size={16} />
                  </ActionIcon>
                </Tooltip>

                <Tooltip label="Publish notification">
                  <ActionIcon
                    variant="light"
                    color="green"
                    size="lg"
                    onClick={() => onPublish(notification.id)}
                    radius="md"
                  >
                    <IconSend size={16} />
                  </ActionIcon>
                </Tooltip>

                {isDeleteConfirm ? (
                  <Group gap="xs">
                    <Button
                      leftSection={<IconTrash size={16} />}
                      variant="filled"
                      color="red"
                      size="sm"
                      onClick={() => onDelete(notification.id)}
                      radius="md"
                    >
                      Confirm
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => setDeleteConfirm(null)}
                      radius="md"
                    >
                      Cancel
                    </Button>
                  </Group>
                ) : (
                  <Tooltip label="Delete notification">
                    <ActionIcon
                      variant="light"
                      color="red"
                      size="lg"
                      onClick={() => setDeleteConfirm(notification.id)}
                      radius="md"
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Tooltip>
                )}
              </>
            ) : (
              <Text size="sm" c="dimmed" fw={500}>
                Notification sent
              </Text>
            )}
          </Group>
        </Group>
      </Stack>
    </Card>
  );
}

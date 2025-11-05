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
  Code,
  Collapse,
  Box,
} from "@mantine/core";
import {
  IconSend,
  IconTrash,
  IconEdit,
  IconChevronDown,
} from "@tabler/icons-react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { useState } from "react";

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
  const [showDetails, setShowDetails] = useState(false);

  const hasAdvancedFields =
    notification.data ||
    notification.ttl ||
    notification.iosMessageSubtitle ||
    notification.badgeCount ||
    notification.androidChannelId;

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
            {notification.iosMessageSubtitle && (
              <Text size="sm" c="dimmed" mb={8} fs="italic">
                {notification.iosMessageSubtitle}
              </Text>
            )}
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

        {/* Advanced Fields Summary */}
        {hasAdvancedFields && (
          <Box>
            <Group gap="xs">
              {notification.ttl && (
                <Badge variant="outline" size="sm" color="gray">
                  TTL: {notification.ttl}s
                </Badge>
              )}
              {notification.badgeCount && (
                <Badge variant="outline" size="sm" color="blue">
                  Badge: {notification.badgeCount}
                </Badge>
              )}
              {notification.androidChannelId && (
                <Badge variant="outline" size="sm" color="orange">
                  Channel: {notification.androidChannelId}
                </Badge>
              )}
              {notification.data && (
                <Badge variant="outline" size="sm" color="violet">
                  Data: {Object.keys(notification.data).length} keys
                </Badge>
              )}
            </Group>
          </Box>
        )}

        <Group justify="space-between" align="center">
          <Group>
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

            {hasAdvancedFields && (
              <ActionIcon
                variant="subtle"
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
              >
                <IconChevronDown
                  size={16}
                  style={{
                    transform: showDetails ? "rotate(180deg)" : "none",
                    transition: "transform 0.2s",
                  }}
                />
              </ActionIcon>
            )}
          </Group>

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

        {/* Advanced Fields Details */}
        <Collapse in={showDetails}>
          <Stack
            gap="sm"
            mt="md"
            p="md"
            bg={theme.colors.gray[0]}
            style={{ borderRadius: theme.radius.md }}
          >
            {notification.data && (
              <Box>
                <Text size="sm" fw={500} mb={4}>
                  Additional Data:
                </Text>
                <Code block style={{ width: "100%", whiteSpace: "pre-wrap" }}>
                  {JSON.stringify(notification.data, null, 2)}
                </Code>
              </Box>
            )}

            <Group grow>
              {notification.ttl && (
                <Box>
                  <Text size="sm" fw={500}>
                    TTL:
                  </Text>
                  <Text size="sm">{notification.ttl} seconds</Text>
                </Box>
              )}

              {notification.badgeCount && (
                <Box>
                  <Text size="sm" fw={500}>
                    Badge Count:
                  </Text>
                  <Text size="sm">{notification.badgeCount}</Text>
                </Box>
              )}

              {notification.androidChannelId && (
                <Box>
                  <Text size="sm" fw={500}>
                    Android Channel:
                  </Text>
                  <Text size="sm">{notification.androidChannelId}</Text>
                </Box>
              )}
            </Group>
          </Stack>
        </Collapse>
      </Stack>
    </Card>
  );
}

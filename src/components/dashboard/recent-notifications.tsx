"use client";

import Link from "next/link";
import { useNotifications } from "@/features/notifications/hooks/use-notifications";
import {
  Card,
  Group,
  Text,
  Stack,
  Skeleton,
  ThemeIcon,
  Avatar,
  Badge,
  ActionIcon,
} from "@mantine/core";
import { IconBell, IconArrowRight, IconEye } from "@tabler/icons-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function RecentNotifications() {
  const { notifications, isLoading } = useNotifications();

  const recentNotifications = notifications.slice(0, 5);

  const getStatusColor = (status: string) => {
    return status === "PUBLISHED" ? "green" : "yellow";
  };

  const getStatusLabel = (status: string) => {
    return status === "PUBLISHED" ? "Publiée" : "Brouillon";
  };

  return (
    <Card withBorder radius="lg">
      <Stack gap="lg">
        <Group justify="space-between">
          <Group gap="sm">
            <ThemeIcon
              variant="gradient"
              gradient={{ from: "blue", to: "cyan" }}
              size="lg"
            >
              <IconBell size={20} />
            </ThemeIcon>
            <div>
              <Text fw={700} size="lg">
                Notifications récentes
              </Text>
              <Text size="sm" c="dimmed">
                Dernières activités de notification
              </Text>
            </div>
          </Group>

          <ActionIcon
            component={Link}
            href="/notifications"
            variant="light"
            color="blue"
            size="lg"
            title="Voir toutes les notifications"
          >
            <IconArrowRight size={18} />
          </ActionIcon>
        </Group>

        {isLoading ? (
          <Stack gap="sm">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} height={60} radius="md" />
            ))}
          </Stack>
        ) : recentNotifications.length === 0 ? (
          <Stack gap="md" align="center" py="xl">
            <ThemeIcon variant="light" color="gray" size="xl" radius="xl">
              <IconBell size={24} />
            </ThemeIcon>
            <Text c="dimmed" ta="center">
              Aucune notification créée pour le moment
            </Text>
          </Stack>
        ) : (
          <Stack gap="xs">
            {recentNotifications.map((notification) => (
              <Group
                key={notification.id}
                justify="space-between"
                p="sm"
                style={{
                  borderRadius: "8px",
                  border: "1px solid #f1f3f5",
                  transition: "all 0.2s",
                }}
                className="hover-card"
              >
                <Group gap="sm">
                  <Avatar
                    size="md"
                    color={getStatusColor(notification.status)}
                    variant="light"
                  >
                    <IconEye size={16} />
                  </Avatar>
                  <div>
                    <Text fw={600} size="sm">
                      {notification.title}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {format(
                        new Date(notification.createdAt),
                        "dd MMM yyyy 'à' HH:mm",
                        {
                          locale: fr,
                        },
                      )}
                    </Text>
                  </div>
                </Group>

                <Badge
                  color={getStatusColor(notification.status)}
                  variant="light"
                  size="sm"
                >
                  {getStatusLabel(notification.status)}
                </Badge>
              </Group>
            ))}
          </Stack>
        )}
      </Stack>
    </Card>
  );
}

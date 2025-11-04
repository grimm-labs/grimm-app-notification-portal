"use client";

import Link from "next/link";
import { useNotifications } from "@/features/notifications/hooks/use-notifications";
import { Card, Group, Text, Stack, Skeleton, ThemeIcon } from "@mantine/core";
import { IconBell } from "@tabler/icons-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function RecentNotifications() {
  const { notifications, isLoading } = useNotifications();

  const recentNotifications = notifications.slice(0, 5);

  return (
    <Card withBorder>
      <Stack gap="md">
        <Group justify="space-between">
          <Group gap="sm">
            <ThemeIcon variant="light" color="blue" size="lg">
              <IconBell size={20} />
            </ThemeIcon>
            <div>
              <Text fw={500}>Notifications récentes</Text>
              <Text size="sm" c="dimmed">
                Les 5 dernières notifications
              </Text>
            </div>
          </Group>

          <Text
            component={Link}
            href="/notifications"
            size="sm"
            c="blue"
            style={{ textDecoration: "none" }}
          >
            Voir tout
          </Text>
        </Group>

        {isLoading ? (
          <Stack gap="sm">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} height={40} />
            ))}
          </Stack>
        ) : recentNotifications.length === 0 ? (
          <Text c="dimmed" ta="center" py="md">
            Aucune notification pour le moment
          </Text>
        ) : (
          <Stack gap="sm">
            {recentNotifications.map((notification) => (
              <Group key={notification.id} justify="space-between">
                <div style={{ flex: 1 }}>
                  <Text fw={500} size="sm" truncate>
                    {notification.title}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {format(new Date(notification.createdAt), "dd MMM yyyy", {
                      locale: fr,
                    })}
                  </Text>
                </div>
                <Text
                  size="xs"
                  c={notification.status === "PUBLISHED" ? "green" : "yellow"}
                  fw={500}
                >
                  {notification.status === "PUBLISHED"
                    ? "Publiée"
                    : "Brouillon"}
                </Text>
              </Group>
            ))}
          </Stack>
        )}
      </Stack>
    </Card>
  );
}

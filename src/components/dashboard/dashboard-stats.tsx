"use client";

import { useNotifications } from "@/features/notifications/hooks/use-notifications";
import { Group, Paper, Text, Stack, ThemeIcon } from "@mantine/core";
import { IconBell, IconSend, IconEdit } from "@tabler/icons-react";

export function DashboardStats() {
  const { notifications } = useNotifications();

  const stats = {
    total: notifications.length,
    published: notifications.filter((n) => n.status === "PUBLISHED").length,
    drafts: notifications.filter((n) => n.status === "DRAFT").length,
  };

  const statItems = [
    {
      label: "Total des notifications",
      value: stats.total,
      icon: IconBell,
      color: "blue",
    },
    {
      label: "Notifications publiées",
      value: stats.published,
      icon: IconSend,
      color: "green",
    },
    {
      label: "Brouillons",
      value: stats.drafts,
      icon: IconEdit,
      color: "yellow",
    },
  ];

  return (
    <Group gap="md">
      {statItems.map((stat) => (
        <Paper key={stat.label} p="md" withBorder flex={1}>
          <Group>
            <ThemeIcon color={stat.color} variant="light" size="xl">
              <stat.icon size={24} />
            </ThemeIcon>
            <Stack gap={0}>
              <Text size="xl" fw={700}>
                {stat.value}
              </Text>
              <Text size="sm" c="dimmed">
                {stat.label}
              </Text>
            </Stack>
          </Group>
        </Paper>
      ))}
    </Group>
  );
}

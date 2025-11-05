"use client";

import { useNotifications } from "@/features/notifications/hooks/use-notifications";
import { Group, Paper, Text, Stack, ThemeIcon } from "@mantine/core";
import {
  IconBell,
  IconSend,
  IconEdit,
  IconChartBar,
} from "@tabler/icons-react";

export function DashboardStats() {
  const { notifications } = useNotifications();

  const stats = {
    total: notifications.length,
    published: notifications.filter((n) => n.status === "PUBLISHED").length,
    drafts: notifications.filter((n) => n.status === "DRAFT").length,
  };

  const publishedPercentage =
    stats.total > 0 ? (stats.published / stats.total) * 100 : 0;

  const statItems = [
    {
      label: "Total notifications",
      value: stats.total,
      icon: IconBell,
      color: "blue",
      description: "All notifications",
    },
    {
      label: "Published",
      value: stats.published,
      icon: IconSend,
      color: "green",
      description: "Sent to users",
    },
    {
      label: "Drafts",
      value: stats.drafts,
      icon: IconEdit,
      color: "orange",
      description: "Pending publication",
    },
    {
      label: "Publication rate",
      value: `${Math.round(publishedPercentage)}%`,
      icon: IconChartBar,
      color: "grape",
      description: "Published notifications",
    },
  ];

  return (
    <Group gap="lg" align="stretch">
      {statItems.map((stat, index) => (
        <Paper
          key={stat.label}
          p="xl"
          withBorder
          style={{ flex: 1, minWidth: "200px" }}
          radius="lg"
        >
          <Stack gap="md" align="center" justify="center" h="100%">
            <ThemeIcon color={stat.color} variant="light" size="xl" radius="xl">
              <stat.icon size={24} />
            </ThemeIcon>
            <Stack gap={2} align="center">
              <Text size="32px" fw={700} c="dark.4">
                {stat.value}
              </Text>
              <Text size="sm" c="dimmed" ta="center" fw={500}>
                {stat.label}
              </Text>
              <Text size="xs" c="dimmed" ta="center">
                {stat.description}
              </Text>
            </Stack>
          </Stack>
        </Paper>
      ))}
    </Group>
  );
}

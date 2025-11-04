"use client";

import { ReactNode } from "react";
import { AppShell, Group, Text, Burger, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBell } from "@tabler/icons-react";
import { DashboardSidebar } from "@/components/layout/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" justify="space-between" px="md">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <IconBell size={28} color={theme.colors.blue[6]} />
            <Text fw={700} size="xl">
              Grimm Notification Portal
            </Text>
          </Group>

          <Text size="sm" c="dimmed">
            Admin
          </Text>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <DashboardSidebar onItemClick={() => toggle()} />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

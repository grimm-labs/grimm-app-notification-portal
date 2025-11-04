"use client";

import { NavLink, Stack } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconDashboard, IconBell, IconPlus } from "@tabler/icons-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: IconDashboard,
    description: "Vue d'ensemble",
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: IconBell,
    description: "Gérer les notifications",
  },
];

interface DashboardSidebarProps {
  onItemClick?: () => void;
}

export function DashboardSidebar({ onItemClick }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <Stack gap="xs">
      {navigation.map((item) => {
        const isActive = pathname === item.href;

        return (
          <NavLink
            key={item.name}
            component={Link}
            href={item.href}
            label={item.name}
            description={item.description}
            leftSection={<item.icon size={20} />}
            active={isActive}
            variant="filled"
            onClick={onItemClick}
          />
        );
      })}

      <NavLink
        component={Link}
        href="/notifications/create"
        label="Nouvelle notification"
        description="Créer une notification"
        leftSection={<IconPlus size={20} />}
        active={pathname === "/notifications/create"}
        variant="filled"
        color="blue"
        onClick={onItemClick}
      />
    </Stack>
  );
}

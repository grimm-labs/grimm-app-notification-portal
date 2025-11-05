"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconDashboard, IconBell } from "@tabler/icons-react";
import { Group } from "@mantine/core";
import { Logo } from "../ui/logo";
import classes from "./sidebar.module.css";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: IconDashboard,
    description: "Overview",
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: IconBell,
    description: "Manage notifications",
  },
];

interface DashboardSidebarProps {
  onItemClick?: () => void;
}

export function DashboardSidebar({ onItemClick }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <nav className={classes.navbar}>
      {/* Header */}
      <div style={{ borderBottom: "1.5px solid #e9ecef", marginBottom: 28 }}>
        <Group justify="center" mb="md">
          <Logo />
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              background: "#fff",
              borderRadius: 4,
              padding: "2px 8px",
              color: "#333",
            }}
          ></span>
        </Group>
      </div>

      {/* Navigation Links */}
      <div className={classes.links}>
        <div className={classes.linksInner}>
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`${classes.menuItem} ${isActive ? classes.menuItemActive : ""}`}
                onClick={onItemClick}
              >
                <div className={classes.iconBox}>
                  <item.icon size={20} color="white" />
                </div>
                <span className={classes.labelText}>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

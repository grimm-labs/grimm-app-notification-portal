import React from "react";
import { IconChevronRight, IconLogout, IconUser } from "@tabler/icons-react";
import { Avatar, Menu } from "@mantine/core";

export const UserButton = ({
  onAccountClick,
  onLogoutClick,
}: {
  onAccountClick?: () => void;
  onLogoutClick?: () => void;
}) => {
  return (
    <Menu position="top-end" width={180} withinPortal>
      <Menu.Target>
        <button
          type="button"
          style={{
            width: "100%",
            maxWidth: "100%",
            background: "#fff",
            border: "1px solid #e9ecef",
            padding: "12px 0 12px 16px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
            transition: "background 0.15s",
            margin: 0,
            boxSizing: "border-box",
            overflow: "hidden",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#f8f9fa")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#fff")}
        >
          <Avatar
            src="/avatar.png"
            alt="User avatar"
            radius="xl"
            size={48}
            style={{ marginRight: 16, flexShrink: 0 }}
          />
          <div style={{ flex: 1, textAlign: "left", minWidth: 0 }}>
            <div
              style={{
                fontWeight: 500,
                fontSize: 13,
                color: "#111",
                lineHeight: 1.2,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {"Admin"}
            </div>
            <div
              style={{
                color: "#868e96",
                fontSize: 12,
                marginTop: 2,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {"—"}
            </div>
          </div>
          <IconChevronRight
            size={22}
            color="#adb5bd"
            style={{ marginLeft: 8, flexShrink: 0 }}
          />
        </button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={onAccountClick}>
          <IconUser size={18} style={{ marginRight: 8 }} />
          Account
        </Menu.Item>
        <Menu.Item color="red" onClick={onLogoutClick}>
          <IconLogout size={18} style={{ marginRight: 8 }} />
          Log Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

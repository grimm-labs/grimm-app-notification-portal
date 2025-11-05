"use client";

import { useState } from "react";
import {
  Stack,
  Group,
  Title,
  Text,
  Button,
  Alert,
  Modal,
  Tabs,
  Pagination,
  Box,
} from "@mantine/core";
import { IconAlertCircle, IconPlus } from "@tabler/icons-react";
import { useNotifications } from "@/features/notifications/hooks/use-notifications";
import { useNotificationStore } from "@/stores/notification-store";
import { NotificationList } from "@/components/notifications/notification-list";
import { NotificationForm } from "@/components/notifications/notification-form";
import { Notification, JsonObject } from "@/types";

const ITEMS_PER_PAGE = 4;

const convertNotificationToFormData = (notification: Notification | null) => {
  if (!notification) return undefined;

  return {
    title: notification.title,
    body: notification.body,
    data: (notification.data as JsonObject) ?? undefined,
    ttl: notification.ttl ?? undefined,
    iosMessageSubtitle: notification.iosMessageSubtitle ?? undefined,
    badgeCount: notification.badgeCount ?? undefined,
    androidChannelId: notification.androidChannelId ?? undefined,
  };
};

export default function NotificationsPage() {
  const {
    notifications,
    isLoading,
    error,
    deleteNotification,
    publishNotification,
    clearError,
  } = useNotifications();

  const {
    createNotification,
    updateNotification,
    currentNotification,
    fetchNotification,
    clearCurrentNotification,
  } = useNotificationStore();

  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredNotifications = notifications.filter((notification) => {
    switch (activeTab) {
      case "drafts":
        return notification.status === "DRAFT";
      case "published":
        return notification.status === "PUBLISHED";
      default:
        return true;
    }
  });

  const totalPages = Math.ceil(filteredNotifications.length / ITEMS_PER_PAGE);
  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleDelete = async (id: string) => {
    await deleteNotification(id);
    setDeleteConfirm(null);
    if (paginatedNotifications.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePublish = async (id: string) => {
    await publishNotification(id);
  };

  const handleEdit = async (notification: Notification) => {
    if (notification.status === "DRAFT") {
      try {
        await fetchNotification(notification.id);
        setIsEditing(true);
        setModalOpened(true);
      } catch (err) {
        console.error("Error fetching notification:", err);
      }
    }
  };

  const handleCreate = () => {
    clearCurrentNotification();
    setIsEditing(false);
    setModalOpened(true);
  };

  const handleModalClose = () => {
    setModalOpened(false);
    setIsEditing(false);
    clearCurrentNotification();
    clearError();
  };

  const handleSubmit = async (data: {
    title: string;
    body: string;
    data?: JsonObject;
    ttl?: number;
    iosMessageSubtitle?: string;
    badgeCount?: number;
    androidChannelId?: string;
  }) => {
    try {
      if (isEditing && currentNotification) {
        await updateNotification(currentNotification.id, data);
      } else {
        await createNotification(data);
      }
      handleModalClose();
    } catch (err) {
      console.error("Error submitting notification:", err);
    }
  };

  const handleTabChange = (value: string | null) => {
    if (value) {
      setActiveTab(value);
      setCurrentPage(1);
    }
  };

  const publishedCount = notifications.filter(
    (n) => n.status === "PUBLISHED",
  ).length;
  const draftCount = notifications.filter((n) => n.status === "DRAFT").length;

  return (
    <>
      <Stack gap="lg">
        <Group justify="space-between">
          <div>
            <Title order={1}>Notification Management</Title>
            <Text c="dimmed" mt={4}>
              Create and manage push notifications for the Grimm app
            </Text>
          </div>

          <Button
            leftSection={<IconPlus size={16} />}
            onClick={handleCreate}
            size="md"
          >
            New Notification
          </Button>
        </Group>

        <Group gap="lg">
          <Group gap="xs">
            <Text fw={500}>Total:</Text>
            <Text fw={700} c="blue">
              {notifications.length}
            </Text>
          </Group>
          <Group gap="xs">
            <Text fw={500}>Published:</Text>
            <Text fw={700} c="green">
              {publishedCount}
            </Text>
          </Group>
          <Group gap="xs">
            <Text fw={500}>Drafts:</Text>
            <Text fw={700} c="orange">
              {draftCount}
            </Text>
          </Group>
        </Group>

        {error && (
          <Alert
            variant="light"
            color="red"
            title="Error"
            icon={<IconAlertCircle />}
          >
            {error}
          </Alert>
        )}

        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tabs.List>
            <Tabs.Tab value="all">All ({notifications.length})</Tabs.Tab>
            <Tabs.Tab value="published">Published ({publishedCount})</Tabs.Tab>
            <Tabs.Tab value="drafts">Drafts ({draftCount})</Tabs.Tab>
          </Tabs.List>

          <Box mt="md">
            <Tabs.Panel value="all">
              <NotificationList
                notifications={paginatedNotifications}
                isLoading={isLoading}
                onDelete={handleDelete}
                onPublish={handlePublish}
                onEdit={handleEdit}
                deleteConfirm={deleteConfirm}
                setDeleteConfirm={setDeleteConfirm}
              />
            </Tabs.Panel>

            <Tabs.Panel value="published">
              <NotificationList
                notifications={paginatedNotifications}
                isLoading={isLoading}
                onDelete={handleDelete}
                onPublish={handlePublish}
                onEdit={handleEdit}
                deleteConfirm={deleteConfirm}
                setDeleteConfirm={setDeleteConfirm}
              />
            </Tabs.Panel>

            <Tabs.Panel value="drafts">
              <NotificationList
                notifications={paginatedNotifications}
                isLoading={isLoading}
                onDelete={handleDelete}
                onPublish={handlePublish}
                onEdit={handleEdit}
                deleteConfirm={deleteConfirm}
                setDeleteConfirm={setDeleteConfirm}
              />
            </Tabs.Panel>
          </Box>
        </Tabs>

        {totalPages > 1 && (
          <Group justify="center" mt="xl">
            <Pagination
              value={currentPage}
              onChange={setCurrentPage}
              total={totalPages}
              size="sm"
              radius="md"
              withEdges
            />
          </Group>
        )}
      </Stack>

      <Modal
        opened={modalOpened}
        onClose={handleModalClose}
        title={
          <Text fw={700}>
            {isEditing ? "Edit Notification" : "Create Notification"}
          </Text>
        }
        size="lg"
        centered
        padding="xl"
      >
        <NotificationForm
          onSubmit={handleSubmit}
          onCancel={handleModalClose}
          isLoading={isLoading}
          initialData={convertNotificationToFormData(currentNotification)}
          submitButtonText={
            isEditing ? "Update Notification" : "Create Notification"
          }
        />
      </Modal>
    </>
  );
}

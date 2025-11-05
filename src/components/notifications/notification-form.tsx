"use client";

import { useForm } from "@mantine/form";
import {
  TextInput,
  Textarea,
  Button,
  Group,
  Stack,
  Text,
  Progress,
  Box,
  Card,
  NumberInput,
  JsonInput,
  Accordion,
  Badge,
} from "@mantine/core";
import { IconSend, IconSettings } from "@tabler/icons-react";
import { JsonObject } from "@/types";

interface NotificationFormData {
  title: string;
  body: string;
  data?: JsonObject;
  ttl?: number;
  iosMessageSubtitle?: string;
  badgeCount?: number;
  androidChannelId?: string;
}

interface NotificationFormProps {
  onSubmit: (data: NotificationFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: NotificationFormData;
  submitButtonText?: string;
}

const MAX_BODY_LENGTH = 1000;
const MAX_TITLE_LENGTH = 255;
const MAX_SUBTITLE_LENGTH = 255;
const MAX_CHANNEL_ID_LENGTH = 255;

const getDefaultFormData = (): NotificationFormData => ({
  title: "",
  body: "",
  data: undefined,
  ttl: undefined,
  iosMessageSubtitle: undefined,
  badgeCount: undefined,
  androidChannelId: undefined,
});

const mergeWithDefaultFormData = (
  initialData?: NotificationFormData,
): NotificationFormData => {
  if (!initialData) return getDefaultFormData();

  return {
    title: initialData.title || "",
    body: initialData.body || "",
    data: initialData.data,
    ttl: initialData.ttl,
    iosMessageSubtitle: initialData.iosMessageSubtitle,
    badgeCount: initialData.badgeCount,
    androidChannelId: initialData.androidChannelId,
  };
};

export function NotificationForm({
  onSubmit,
  onCancel,
  isLoading = false,
  initialData,
  submitButtonText = "Create notification",
}: NotificationFormProps) {
  const form = useForm<NotificationFormData>({
    initialValues: mergeWithDefaultFormData(initialData),
    validate: {
      title: (value) => {
        if (!value.trim()) return "Title is required";
        if (value.length > MAX_TITLE_LENGTH)
          return `Title cannot exceed ${MAX_TITLE_LENGTH} characters`;
        return null;
      },
      body: (value) => {
        if (!value.trim()) return "Content is required";
        if (value.length > MAX_BODY_LENGTH)
          return `Content cannot exceed ${MAX_BODY_LENGTH} characters`;
        return null;
      },
      iosMessageSubtitle: (value) => {
        if (value && value.length > MAX_SUBTITLE_LENGTH)
          return `Subtitle cannot exceed ${MAX_SUBTITLE_LENGTH} characters`;
        return null;
      },
      androidChannelId: (value) => {
        if (value && value.length > MAX_CHANNEL_ID_LENGTH)
          return `Channel ID cannot exceed ${MAX_CHANNEL_ID_LENGTH} characters`;
        return null;
      },
      ttl: (value) => {
        if (value && value < 0) return "TTL cannot be negative";
        return null;
      },
      badgeCount: (value) => {
        if (value && value < 0) return "Badge count cannot be negative";
        return null;
      },
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    const cleanedValues: NotificationFormData = {
      title: values.title,
      body: values.body,
      data:
        values.data && Object.keys(values.data).length > 0
          ? values.data
          : undefined,
      ttl: values.ttl || undefined,
      iosMessageSubtitle: values.iosMessageSubtitle || undefined,
      badgeCount: values.badgeCount || undefined,
      androidChannelId: values.androidChannelId || undefined,
    };
    onSubmit(cleanedValues);
  });

  const bodyLength = form.values.body.length;
  const bodyProgress = (bodyLength / MAX_BODY_LENGTH) * 100;
  const isBodyOverLimit = bodyLength > MAX_BODY_LENGTH;

  return (
    <Card withBorder radius="lg" p="xl">
      <form onSubmit={handleSubmit}>
        <Stack gap="lg">
          {/* Basic Information */}
          <Box>
            <Text fw={500} mb="xs" size="sm">
              Notification title *
            </Text>
            <TextInput
              placeholder="Enter a title..."
              required
              size="md"
              radius="md"
              {...form.getInputProps("title")}
            />
            <Text size="xs" c="dimmed" mt={4}>
              {form.values.title.length}/{MAX_TITLE_LENGTH} characters
            </Text>
          </Box>

          <Box>
            <Text fw={500} mb="xs" size="sm">
              Notification content *
            </Text>
            <Textarea
              placeholder="Describe the content of your notification..."
              required
              minRows={4}
              size="md"
              radius="md"
              {...form.getInputProps("body")}
            />
            <Box mt="xs">
              <Group justify="space-between" mb={4}>
                <Text size="sm" c="dimmed">
                  {bodyLength} / {MAX_BODY_LENGTH} characters
                </Text>
                {isBodyOverLimit && (
                  <Text size="sm" c="red">
                    Too long
                  </Text>
                )}
              </Group>
              <Progress
                value={bodyProgress}
                color={
                  isBodyOverLimit
                    ? "red"
                    : bodyProgress > 80
                      ? "yellow"
                      : "blue"
                }
                size="sm"
                radius="xl"
              />
            </Box>
          </Box>

          {/* Advanced Settings */}
          <Accordion variant="separated" radius="md">
            <Accordion.Item value="advanced">
              <Accordion.Control icon={<IconSettings size={18} />}>
                <Group>
                  <Text fw={500}>Advanced Settings</Text>
                  <Badge variant="light" color="blue" size="sm">
                    Optional
                  </Badge>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <Stack gap="md">
                  {/* iOS Specific */}
                  <Box>
                    <Text fw={500} mb="xs" size="sm">
                      iOS Message Subtitle
                    </Text>
                    <TextInput
                      placeholder="Enter subtitle for iOS notifications..."
                      size="md"
                      radius="md"
                      value={form.values.iosMessageSubtitle || ""}
                      onChange={(event) =>
                        form.setFieldValue(
                          "iosMessageSubtitle",
                          event.currentTarget.value || undefined,
                        )
                      }
                    />
                    <Text size="xs" c="dimmed" mt={4}>
                      {form.values.iosMessageSubtitle?.length || 0}/
                      {MAX_SUBTITLE_LENGTH} characters
                    </Text>
                  </Box>

                  <Group grow>
                    <Box>
                      <Text fw={500} mb="xs" size="sm">
                        Badge Count (iOS)
                      </Text>
                      <NumberInput
                        placeholder="Enter badge count..."
                        min={0}
                        size="md"
                        radius="md"
                        value={form.values.badgeCount || undefined}
                        onChange={(value) =>
                          form.setFieldValue(
                            "badgeCount",
                            typeof value === "number" ? value : undefined,
                          )
                        }
                      />
                    </Box>

                    <Box>
                      <Text fw={500} mb="xs" size="sm">
                        TTL (Seconds)
                      </Text>
                      <NumberInput
                        placeholder="Time to live in seconds"
                        min={0}
                        size="md"
                        radius="md"
                        value={form.values.ttl || undefined}
                        onChange={(value) =>
                          form.setFieldValue(
                            "ttl",
                            typeof value === "number" ? value : undefined,
                          )
                        }
                      />
                    </Box>
                  </Group>

                  {/* Android Specific */}
                  <Box>
                    <Text fw={500} mb="xs" size="sm">
                      Android Channel ID
                    </Text>
                    <TextInput
                      placeholder="Enter Android channel ID..."
                      size="md"
                      radius="md"
                      value={form.values.androidChannelId || ""}
                      onChange={(event) =>
                        form.setFieldValue(
                          "androidChannelId",
                          event.currentTarget.value || undefined,
                        )
                      }
                    />
                    <Text size="xs" c="dimmed" mt={4}>
                      {form.values.androidChannelId?.length || 0}/
                      {MAX_CHANNEL_ID_LENGTH} characters
                    </Text>
                  </Box>

                  {/* Additional Data */}
                  <Box>
                    <Text fw={500} mb="xs" size="sm">
                      Additional Data (JSON)
                    </Text>
                    <JsonInput
                      placeholder='{"key": "value", "screen": "Home"}'
                      minRows={3}
                      size="md"
                      radius="md"
                      formatOnBlur
                      autosize
                      value={
                        form.values.data
                          ? JSON.stringify(form.values.data, null, 2)
                          : ""
                      }
                      onChange={(value) => {
                        try {
                          const parsed = value ? JSON.parse(value) : undefined;
                          form.setFieldValue("data", parsed);
                        } catch {}
                      }}
                    />
                    <Text size="xs" c="dimmed" mt={4}>
                      Additional data payload for the notification
                    </Text>
                  </Box>
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>

          <Group justify="flex-end" gap="sm" mt="md">
            <Button
              variant="light"
              onClick={onCancel}
              disabled={isLoading}
              size="md"
              radius="md"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isLoading}
              leftSection={<IconSend size={18} />}
              size="md"
              radius="md"
              disabled={isBodyOverLimit}
            >
              {submitButtonText}
            </Button>
          </Group>
        </Stack>
      </form>
    </Card>
  );
}

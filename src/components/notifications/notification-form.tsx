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
} from "@mantine/core";
import { IconSend } from "@tabler/icons-react";

interface NotificationFormData {
  title: string;
  body: string;
}

interface NotificationFormProps {
  onSubmit: (data: NotificationFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: Partial<NotificationFormData>;
  submitButtonText?: string;
}

const MAX_BODY_LENGTH = 1000;

export function NotificationForm({
  onSubmit,
  onCancel,
  isLoading = false,
  initialData,
  submitButtonText = "Create notification",
}: NotificationFormProps) {
  const form = useForm<NotificationFormData>({
    initialValues: {
      title: initialData?.title || "",
      body: initialData?.body || "",
    },
    validate: {
      title: (value) => {
        if (!value.trim()) return "Title is required";
        if (value.length > 100) return "Title cannot exceed 100 characters";
        return null;
      },
      body: (value) => {
        if (!value.trim()) return "Content is required";
        if (value.length > MAX_BODY_LENGTH)
          return `Content cannot exceed ${MAX_BODY_LENGTH} characters`;
        return null;
      },
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    onSubmit(values);
  });

  const bodyLength = form.values.body.length;
  const bodyProgress = (bodyLength / MAX_BODY_LENGTH) * 100;
  const isBodyOverLimit = bodyLength > MAX_BODY_LENGTH;

  return (
    <Card withBorder radius="lg" p="xl">
      <form onSubmit={handleSubmit}>
        <Stack gap="lg">
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
              {form.values.title.length}/100 characters
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

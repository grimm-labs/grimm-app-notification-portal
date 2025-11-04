"use client";

import { useForm } from "@mantine/form";
import { TextInput, Textarea, Button, Group, Stack, Text } from "@mantine/core";

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

export function NotificationForm({
  onSubmit,
  onCancel,
  isLoading = false,
  initialData,
  submitButtonText = "Enregistrer",
}: NotificationFormProps) {
  const form = useForm<NotificationFormData>({
    initialValues: {
      title: initialData?.title || "",
      body: initialData?.body || "",
    },
    validate: {
      title: (value) => (value.length < 1 ? "Le titre est requis" : null),
      body: (value) => (value.length < 1 ? "Le contenu est requis" : null),
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    onSubmit(values);
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="lg">
        <TextInput
          label="Titre de la notification"
          placeholder="Entrez le titre de la notification..."
          required
          {...form.getInputProps("title")}
        />

        <Textarea
          label="Contenu de la notification"
          placeholder="Entrez le contenu de la notification..."
          required
          minRows={4}
          {...form.getInputProps("body")}
        />

        <Text size="sm" c="dimmed">
          {1000 - form.values.body.length} caractères restants
        </Text>

        <Group justify="flex-end" gap="sm">
          <Button variant="default" onClick={onCancel} disabled={isLoading}>
            Annuler
          </Button>
          <Button type="submit" loading={isLoading}>
            {submitButtonText}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

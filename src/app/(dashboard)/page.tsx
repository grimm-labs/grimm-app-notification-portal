import { Stack, Title } from "@mantine/core";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { RecentNotifications } from "@/components/dashboard/recent-notifications";

export default function DashboardPage() {
  return (
    <Stack gap="lg">
      <div>
        <Title order={1}>Grimm App Notification Portal</Title>
      </div>

      <DashboardStats />
      <RecentNotifications />
    </Stack>
  );
}

import { DashbaordLayout } from "@/components/layout/DashbaordLayout";
import { Dashboard } from "@/features/dashbaord/components/Dashboard";

const DashboardPage = () => {
  return (
    <DashbaordLayout>
      <Dashboard />
    </DashbaordLayout>
  );
};

export default DashboardPage;

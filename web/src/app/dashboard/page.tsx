import { DashbaordLayout } from "@/components/layout/DashbaordLayout";
import { Dashboard } from "@/feature/dashbaord/components/Dashboard";

const DashboardPage = () => {
  return (
    <DashbaordLayout>
      <Dashboard />
    </DashbaordLayout>
  );
};

export default DashboardPage;

import { DashbaordLayout } from "@/components/layout/DashbaordLayout";
import { AuthProvider } from "@/components/provider/AuthProvider";
import { Dashboard } from "@/features/dashbaord/components/Dashboard";

const DashboardPage = () => {
  return (
    <AuthProvider>
      <DashbaordLayout>
        <Dashboard />
      </DashbaordLayout>
    </AuthProvider>
  );
};

export default DashboardPage;

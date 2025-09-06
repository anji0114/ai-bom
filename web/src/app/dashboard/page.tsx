import { AuthGuard } from "@/components/AuthGuard";
import { Dashboard } from "@/components/Dashboard";

const DashboardPage = () => {
  return (
    <AuthGuard>
      <Dashboard />
    </AuthGuard>
  );
};

export default DashboardPage;

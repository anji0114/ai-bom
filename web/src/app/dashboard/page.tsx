import { AuthProvider } from "@/components/provider/AuthProvider";
import { Dashboard } from "@/components/Dashboard";

const DashboardPage = () => {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
};

export default DashboardPage;

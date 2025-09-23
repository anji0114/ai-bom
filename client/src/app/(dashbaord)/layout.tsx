import { DashbaordLayout } from "@/components/layout/DashbaordLayout";
import { AuthProvider } from "@/components/provider/AuthProvider";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <DashbaordLayout>{children}</DashbaordLayout>
    </AuthProvider>
  );
};

export default DashboardLayout;

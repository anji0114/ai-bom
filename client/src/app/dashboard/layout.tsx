import { AuthProvider } from "@/components/provider/AuthProvider";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default DashboardLayout;

import { Box } from "@mui/material";
import { DashbaordSidebar } from "./DashbaordSidebar";

export const DashbaordLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <DashbaordLayoutContent>{children}</DashbaordLayoutContent>;
};

const DashbaordLayoutContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <DashbaordSidebar />
      <Box component="main" sx={{ flex: 1, height: "100vh", overflow: "auto" }}>
        {children}
      </Box>
    </Box>
  );
};

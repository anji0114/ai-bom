import { Box } from "@mui/material";
import { DashbaordHeader } from "./DashbaordHeader";
import { DashbaordSidebar } from "./DashbaordSidebar";

export const DashbaordLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <DashbaordHeader />
      <DashbaordSidebar />
      <Box
        component="main"
        sx={{
          flex: 1,
          p: 4,
          marginTop: "46px",
          height: "calc(100vh - 46px)",
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

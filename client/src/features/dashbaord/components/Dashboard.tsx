"use client";

import { useRefreshedToken } from "@/features/auth/hooks/useLogin";
import { Button } from "@mui/material";

export const Dashboard = () => {
  const { refreshedToken } = useRefreshedToken();
  return (
    <div>
      <Button onClick={refreshedToken}>Refreshed Token</Button>
    </div>
  );
};

"use client";

import { Box } from "@mui/material";
import { DashbaordHeader } from "./DashbaordHeader";
import { DashbaordSidebar } from "./DashbaordSidebar";
import { useGetProducts } from "@/hooks/useGetProducts";
import { Loading } from "../ui/Loading";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
  const { products, loading, error } = useGetProducts();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !error && !products?.length) {
      router.push("/dashboard/products/new");
    }
  }, [products, loading, error, router]);

  if (loading || !products) return <Loading />;

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <DashbaordHeader />
      <DashbaordSidebar />
      <Box
        component="main"
        sx={{
          flex: 1,
          p: 4,
          marginTop: "48px",
          height: "calc(100vh - 48px)",
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

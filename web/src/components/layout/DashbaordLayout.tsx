"use client";

import { Box } from "@mui/material";
import { DashbaordHeader } from "./DashbaordHeader";
import { DashbaordSidebar } from "./DashbaordSidebar";
import { useGetProducts } from "@/hooks/useGetProducts";
import { Loading } from "../ui/Loading";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import {
  currentProductAtom,
  getStoredProductId,
  setStoredProductId,
} from "@/atoms/productAtoms";

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
  const [currentProduct, setCurrentProduct] = useAtom(currentProductAtom);

  useEffect(() => {
    if (!loading && !error && !products?.length) {
      router.push("/dashboard/products/new");
    }
  }, [products, loading, error, router]);

  useEffect(() => {
    if (!loading && products && products.length > 0) {
      const storedProductId = getStoredProductId();

      if (storedProductId) {
        // 保存されているIDのプロダクトを探す
        const storedProduct = products.find((p) => p.id === storedProductId);
        if (storedProduct) {
          setCurrentProduct(storedProduct);
          return;
        }
      }

      // 保存されているIDが見つからない場合は最初のプロダクトを選択
      const firstProduct = products[0];
      setCurrentProduct(firstProduct);
      setStoredProductId(firstProduct.id);
    }
  }, [products, loading, setCurrentProduct]);

  if (loading || !products) return <Loading />;

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <DashbaordHeader />
      <DashbaordSidebar products={products} />
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

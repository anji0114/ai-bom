"use client";

import { useCreateProduct } from "@/features/dashbaord/hooks/useCreateProduct";
import { Add } from "@mui/icons-material";
import { Box, Button, Container, Grid, List, Typography } from "@mui/material";
import { useGetProducts } from "../hooks/useGetProducts";
import { ProductItem } from "./ProductItem";
import { useFragment } from "@/gql";
import { graphql } from "@/gql";

const fragment = graphql(`
  fragment ProductList on Product {
    id
    ...ProductItem
  }
`);

export const Products = () => {
  const { createProduct, loading } = useCreateProduct();
  const { data } = useGetProducts();
  const products = useFragment(fragment, data?.getProducts || []);

  return (
    <Container maxWidth="lg" sx={{ py: 6, height: "100vh" }}>
      <Grid container spacing={5} height="100%" flexDirection={"column"}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="h2" fontWeight="bold">
            製品一覧
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => createProduct({ name: "" })}
            disabled={loading}
            loading={loading}
          >
            製品を作成
          </Button>
        </Grid>
        <Grid container spacing={2} sx={{ flex: 1 }} flexWrap={"wrap"}>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

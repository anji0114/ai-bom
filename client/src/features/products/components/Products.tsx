"use client";

import { useCreateProduct } from "@/features/dashbaord/hooks/useCreateProduct";
import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  ListItem,
  Typography,
} from "@mui/material";
import { useGetProducts } from "../hooks/useGetProducts";
import Link from "next/link";
import { graphql, useFragment } from "@/gql";

const fragment = graphql(`
  fragment ProductItem on Product {
    id
    name
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
        <Box sx={{ flex: 1 }}>
          {products.map((product) => (
            <ListItem key={product.id}>
              <Link href={`/products/${product.id}`}>
                {product.name || (
                  <Typography variant="body1" component="p">
                    製品名未設定
                  </Typography>
                )}
              </Link>
            </ListItem>
          ))}
        </Box>
      </Grid>
    </Container>
  );
};

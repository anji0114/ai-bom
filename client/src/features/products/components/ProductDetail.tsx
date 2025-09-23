"use client";

import { graphql, useFragment } from "@/gql";
import { useGetProduct } from "../hooks/useGetProduct";
import { Box, Container, Typography } from "@mui/material";
import { CreateFile } from "./CreateFile";

const fragment = graphql(`
  fragment ProductDetail on Product {
    id
    name
  }
`);

export const ProductDetail = ({ id }: { id: string }) => {
  const { data, loading, error } = useGetProduct(id);
  const product = useFragment(fragment, data?.getProduct);

  if (error) return <div>Error: {error.message}</div>;
  if (loading || !product) return <div>Loading...</div>;

  return (
    <Box sx={{ py: 5 }}>
      <Container>
        {product.id} {product.name}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">ファイルを追加</Typography>
          <CreateFile />
        </Box>
      </Container>
    </Box>
  );
};

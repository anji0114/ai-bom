import { FragmentType, graphql, useFragment } from "@/gql";
import { Box, ListItem, Typography } from "@mui/material";
import Link from "next/link";

const fragment = graphql(`
  fragment ProductItem on Product {
    id
    name
  }
`);

type Props = {
  product: FragmentType<typeof fragment>;
};

export const ProductItem = ({ product: _product }: Props) => {
  const product = useFragment(fragment, _product);

  return (
    <Box sx={{ width: "33.33%", p: 2 }}>
      <Link href={`/products/${product.id}`}>
        {product.name || (
          <Typography variant="body1" component="p">
            製品名未設定
          </Typography>
        )}
      </Link>
    </Box>
  );
};

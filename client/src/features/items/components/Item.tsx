"use client";

import { FragmentType, graphql, useFragment } from "@/gql";
import { Box, Card, CardContent, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import { FC } from "react";

export const ItemFragment = graphql(`
  fragment ItemFragment on Item {
    id
    name
    kind
    description
    createdAt
  }
`);

type ItemProps = {
  item: FragmentType<typeof ItemFragment>;
};

export const Item: FC<ItemProps> = ({ item: _item }) => {
  const item = useFragment(ItemFragment, _item);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Link
            component={NextLink}
            href={`/items/${item.id}`}
            variant="h6"
            underline="hover"
            sx={{ fontWeight: "bold" }}
          >
            {item.name}
          </Link>
          <Typography variant="body2" color="text.secondary">
            {item.kind}
          </Typography>
        </Box>
        {item.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {item.description}
          </Typography>
        )}
        <Typography variant="caption" color="text.secondary">
          作成日: {new Date(item.createdAt).toLocaleDateString("ja-JP")}
        </Typography>
      </CardContent>
    </Card>
  );
};

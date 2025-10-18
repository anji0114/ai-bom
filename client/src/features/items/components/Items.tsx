"use client";

import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useCreateItemDialog, useGetItems } from "../hooks";
import { CreateItemDialog } from "./CreateItemDialog";
import { Item } from "./Item";
import { graphql, useFragment } from "@/gql";

const fragment = graphql(`
  fragment ItemListFragment on Item {
    id
    ...ItemFragment
  }
`);

export const Items = () => {
  const { isOpen, handleOpen, handleClose, handleSubmit, loading } =
    useCreateItemDialog();
  const { data, loading: itemsLoading, refetch } = useGetItems();
  const items = useFragment(fragment, data?.getItems);

  const handleItemCreated = async (data: {
    name: string;
    description: string;
    kind: string;
  }) => {
    await handleSubmit(data);
    await refetch();
  };

  return (
    <Box sx={{ p: 4 }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <Typography variant="h6">ダッシュボード</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          アイテム作成
        </Button>
      </Grid>

      {itemsLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : items?.length === 0 ? (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", py: 4 }}
        >
          アイテムがありません
        </Typography>
      ) : (
        <Box>
          {items?.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </Box>
      )}

      <CreateItemDialog
        open={isOpen}
        onClose={handleClose}
        onSubmit={handleItemCreated}
        loading={loading}
      />
    </Box>
  );
};

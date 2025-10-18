"use client";

import { Box, Button, Grid, Typography } from "@mui/material";
import { useCreateItemDialog } from "../hooks";
import { CreateItemDialog } from "./CreateItemDialog";

export const Dashboard = () => {
  const { isOpen, handleOpen, handleClose, handleSubmit, loading } =
    useCreateItemDialog();

  return (
    <Box sx={{ p: 4 }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h6">ダッシュボード</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          アイテム作成
        </Button>
      </Grid>

      <CreateItemDialog
        open={isOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </Box>
  );
};

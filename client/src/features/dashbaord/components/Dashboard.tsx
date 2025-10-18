"use client";

import { Box, Button, Typography } from "@mui/material";
import { useCreateItemDialog } from "../hooks";
import { CreateItemDialog } from "./CreateItemDialog";

export const Dashboard = () => {
  const { isOpen, handleOpen, handleClose, handleSubmit, loading } =
    useCreateItemDialog();

  return (
    <Box sx={{ p: 2 }}>
      <Box>
        <Typography variant="h6">Dashboard</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Create Item
        </Button>
      </Box>

      <CreateItemDialog
        open={isOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </Box>
  );
};

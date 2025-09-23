"use client";

import { Add } from "@mui/icons-material";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

export const Products = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6, height: "100vh" }}>
      <Grid container spacing={5} height="100%" flexDirection={"column"}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="h2" fontWeight="bold">
            製品一覧
          </Typography>
          <Button variant="contained" startIcon={<Add />}>
            製品を作成
          </Button>
        </Grid>
        <Box sx={{ flex: 1, bgcolor: "grey.100" }}>Products</Box>
      </Grid>
    </Container>
  );
};

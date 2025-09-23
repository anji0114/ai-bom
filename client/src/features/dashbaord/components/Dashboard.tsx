"use client";

import { Box, Container } from "@mui/material";

export const Dashboard = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 6,
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          border: "2px dashed",
          borderColor: "grey.300",
          borderRadius: 2,
          p: 4,
          textAlign: "center",
          color: "text.secondary",
          height: "400px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        新しい製品を作成する
      </Box>
    </Container>
  );
};

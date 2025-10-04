"use client";

import { useUploadS3 } from "@/hooks/useUploadS3";
import { Box, Container, Input } from "@mui/material";

export const Dashboard = () => {
  const { openUploadS3 } = useUploadS3();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const response = await openUploadS3(file);
    console.log(response);
    alert("Uploaded");
  };

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
        <input type="file" onChange={(e) => handleUpload(e)} />
      </Box>
    </Container>
  );
};

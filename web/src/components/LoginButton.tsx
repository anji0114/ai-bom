"use client";

import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

export const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = process.env.NEXT_PUBLIC_API_URL + "/api/auth/google";
  };
  return (
    <Button
      onClick={handleLogin}
      variant="contained"
      size="large"
      startIcon={<GoogleIcon />}
      sx={{
        fontWeight: 700,
        py: 1.5,
        px: 4,
      }}
    >
      Googleでログイン / 新規登録
    </Button>
  );
};

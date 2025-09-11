'use client';

import { useSearchParams } from 'next/navigation';
import { Box, Container, Typography, Alert, Button } from '@mui/material';
import { LoginButton } from '@/components/LoginButton';

const LoginPage = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold" textAlign="center">
          ログイン
        </Typography>
        
        {error === 'authentication_failed' && (
          <Alert severity="error" sx={{ width: '100%' }}>
            認証に失敗しました。もう一度お試しください。
          </Alert>
        )}

        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <LoginButton />
        </Box>

        <Button
          href="/"
          variant="outlined"
          sx={{ mt: 2 }}
        >
          トップページに戻る
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
import { AddModerator, NewLabel } from "@mui/icons-material";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export const TopHero = () => {
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
          height: "100vh",
          py: 8,
        }}
      >
        <Image
          src="/logo.svg"
          alt="X-Koutei Logo"
          width={220}
          height={60}
          style={{ marginBottom: 16 }}
        />
        <Typography
          component="h1"
          variant="h3"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          日本の町工場に、「つながる頭脳」を
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4, maxWidth: "700px" }}>
          X-Koutei
          は、中小・零細製造業が抱える情報の分断と属人化の課題を解決し、
          <br />
          AI
          の力で世界に誇るものづくりを実現するための、製造業特化型コンサルティング
          AI です。
        </Typography>
        <Grid container spacing={2}>
          <Link href="/login" passHref>
            <Button
              variant="outlined"
              size="large"
              sx={{ width: "280px" }}
              startIcon={<AddModerator />}
            >
              ログイン
            </Button>
          </Link>
          <Button
            variant="contained"
            size="large"
            sx={{ width: "280px" }}
            startIcon={<NewLabel />}
          >
            新規登録
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};

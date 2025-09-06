import { Box, Container, Typography, Stack } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { LoginButton } from "@/components/ui/LoginButton";

const TopPage = () => {
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          py: 8,
        }}
      >
        <RocketLaunchIcon sx={{ fontSize: 60, mb: 2, color: "primary.main" }} />
        <Typography
          component="h1"
          variant="h2"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          顧客の声を、ビジネスの力に。
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: "700px" }}
        >
          PDM AI
          Agentは、散らばった顧客からのフィードバック(VoC)をAIが自動で整理・分析。
          プロダクトの次の一手を、データドリブンで導き出します。
        </Typography>
        <LoginButton />
      </Box>

      <Stack
        direction="row"
        spacing={4}
        justifyContent="center"
        sx={{ mt: 6, pb: 8 }}
      >
        <Box sx={{ textAlign: "center", maxWidth: 250 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            AIによる自動分類
          </Typography>
          <Typography variant="body2" color="text.secondary">
            「機能要望」「不具合」など、内容に応じてAIが自動でタグ付け。
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center", maxWidth: 250 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            感情・インパクト分析
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ポジティブかネガティブか、ビジネスへの影響度をAIがスコアリング。
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center", maxWidth: 250 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            直感的なダッシュボード
          </Typography>
          <Typography variant="body2" color="text.secondary">
            分析結果をグラフやテーブルで可視化。重要なインサイトを見逃さない。
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};

export default TopPage;

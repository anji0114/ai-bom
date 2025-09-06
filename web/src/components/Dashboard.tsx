"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { useState, useEffect } from "react";
import { UserMenu } from "./Menu";
import { CreateVoiceModal } from "./CreateVoiceModal";

// ユーザーメニュー用のコンポーネント

export const Dashboard = () => {
  const [voicings, setVoicings] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // ダミーデータ。実際にはAPIから取得します。
    const dummyVoicings = [
      {
        id: 1,
        summary: "ログイン画面のデザインが古い",
        tags: ["UI/UX改善"],
        sentiment: "NEUTRAL",
        impact: 2,
        date: "2024-08-15",
      },
      {
        id: 2,
        summary: "もっと安いプランが欲しい",
        tags: ["料金・プラン"],
        sentiment: "NEGATIVE",
        impact: 3,
        date: "2024-08-14",
      },
      {
        id: 3,
        summary: "ファイルアップロード機能が欲しい",
        tags: ["機能要望"],
        sentiment: "POSITIVE",
        impact: 2,
        date: "2024-08-14",
      },
      {
        id: 4,
        summary: "時々動作が重くなる",
        tags: ["不具合報告", "パフォーマンス"],
        sentiment: "NEGATIVE",
        impact: 3,
        date: "2024-08-13",
      },
    ];
    setVoicings(dummyVoicings);
  }, []);

  const handleCreateVoice = (data: any) => {
    const newVoice = {
      id: voicings.length + 1,
      summary: data.summary,
      tags: data.tags,
      sentiment: data.sentiment,
      impact: data.impact,
      date: new Date().toISOString().split('T')[0],
    };
    setVoicings([newVoice, ...voicings]);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* ヘッダー */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            PDM AI Agent
          </Typography>
          <UserMenu />
        </Toolbar>
      </AppBar>

      {/* メインコンテンツ */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar /> {/* AppBarの高さ分スペースを空ける */}
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ mb: 4 }}>
            ダッシュボード
          </Typography>

          {/* サマリーエリア */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={12}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary">VoC総数</Typography>
                  <Typography variant="h5">58</Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* 他のサマリーカード（感情比率グラフなど）をここに追加 */}
          </Grid>

          {/* VoC一覧エリア */}
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6">顧客の声 (VoC) 一覧</Typography>
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />}
                  onClick={() => setIsModalOpen(true)}
                >
                  VoCを追加
                </Button>
              </Box>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="キーワードで検索..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              {/* ここにタグや感情でのフィルタUIを配置 */}
            </CardContent>

            {/* VoC一覧テーブル */}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>VoC要約</TableCell>
                  <TableCell>タグ</TableCell>
                  <TableCell>感情</TableCell>
                  <TableCell>インパクト</TableCell>
                  <TableCell>受信日</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {voicings.map((voc) => (
                  <TableRow hover key={voc.id} sx={{ cursor: "pointer" }}>
                    <TableCell>{voc.summary}</TableCell>
                    <TableCell>
                      {voc.tags.map((tag: string) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{ mr: 0.5 }}
                        />
                      ))}
                    </TableCell>
                    <TableCell>
                      {voc.sentiment === "POSITIVE" && (
                        <SentimentSatisfiedAltIcon color="success" />
                      )}
                      {voc.sentiment === "NEUTRAL" && (
                        <SentimentNeutralIcon color="action" />
                      )}
                      {voc.sentiment === "NEGATIVE" && (
                        <SentimentVeryDissatisfiedIcon color="error" />
                      )}
                    </TableCell>
                    <TableCell>{"★".repeat(voc.impact)}</TableCell>
                    <TableCell>{voc.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Container>
      </Box>
      
      <CreateVoiceModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateVoice}
      />
    </Box>
  );
};

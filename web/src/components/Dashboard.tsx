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
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import { useState } from "react";
import { UserMenu } from "./Menu";
import { VoiceCreateModal } from "./VoiceCreateModal";
import Image from "next/image";
import { graphql, useFragment } from "@/gql";
import { useQuery } from "@apollo/client/react";
import { GetVoicingsDocument } from "@/gql/graphql";
import { VoiceItem } from "./VoiceItem";
import { robotoFonts } from "@/lib/theme";

graphql(`
  query GetVoicings {
    getVoicings {
      ...VoicingConnection
    }
  }
`);

const voicingConnectionFragment = graphql(`
  fragment VoicingConnection on VoicingConnection {
    data {
      id
      ...VoiceInfo
    }
    total
  }
`);

export const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useQuery(GetVoicingsDocument);
  const voicingConnection = useFragment(
    voicingConnectionFragment,
    data?.getVoicings
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* ヘッダー */}
      <AppBar
        position="fixed"
        color="transparent"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          boxShadow: "none",
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          backgroundColor: "#fff",
        }}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          px={4}
          py={1}
        >
          <Grid display="flex" alignItems="center" gap={0.5}>
            <Image src="/logo.png" width={24} height={22} alt="pdm agent" />
            <Typography
              variant="caption"
              color="primary"
              component="span"
              fontWeight={700}
              fontFamily={robotoFonts}
            >
              PDM AGENT
            </Typography>
          </Grid>
          <UserMenu />
        </Grid>
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
              <Card variant="outlined">
                <CardContent
                  sx={{ display: "flex", gap: 2, alignItems: "center" }}
                >
                  <Typography color="text.secondary" pt={0.5}>
                    VoC総数
                  </Typography>
                  <Typography variant="h5">
                    {voicingConnection?.total}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* 他のサマリーカード（感情比率グラフなど）をここに追加 */}
          </Grid>

          {/* VoC一覧エリア */}
          <Card variant="outlined">
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
              {voicingConnection?.data && (
                <TableBody>
                  {voicingConnection.data.map((voicing) => (
                    <VoiceItem key={voicing.id} voicing={voicing} />
                  ))}
                </TableBody>
              )}
            </Table>
          </Card>
        </Container>
      </Box>

      <VoiceCreateModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Box>
  );
};

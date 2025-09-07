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

graphql(`
  query GetVoicings {
    getVoicings {
      ...VoiceList
    }
  }
`);

const fragment = graphql(`
  fragment VoiceList on Voicing {
    id
    ...VoiceInfo
  }
`);

export const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useQuery(GetVoicingsDocument);
  const voicings = useFragment(fragment, data?.getVoicings);

  return (
    <Box sx={{ display: "flex" }}>
      {/* ヘッダー */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          px={4}
          py={1}
        >
          <Grid display="flex" alignItems="center" gap={1}>
            <Image src="/logo.png" width={32} height={32} alt="pdm agent" />
            <Typography fontWeight={700} fontSize={16}>
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
              {voicings && (
                <TableBody>
                  {voicings.map((voicing) => (
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

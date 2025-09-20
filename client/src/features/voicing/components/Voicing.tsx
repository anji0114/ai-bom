"use client";

import {
  Typography,
  Box,
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
import { graphql, useFragment } from "@/gql";
import { useQuery } from "@apollo/client/react";
import { GetVoicingsDocument } from "@/gql/graphql";
import { VoiceItem } from "./VoiceItem";
import { currentProductAtom } from "@/atoms/productAtoms";
import { useAtomValue } from "jotai";

graphql(`
  query GetVoicings($input: GetVoicingsInput!) {
    getVoicings(input: $input) {
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

export const VoicingDashboard = () => {
  const currentProduct = useAtomValue(currentProductAtom);

  const { data } = useQuery(GetVoicingsDocument, {
    variables: { input: { productId: currentProduct?.id || "" } },
    skip: !currentProduct?.id,
  });

  const voicingConnection = useFragment(
    voicingConnectionFragment,
    data?.getVoicings || null
  );

  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default" }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 4 }}>
        顧客の声一覧
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={12}>
          <Card variant="outlined">
            <CardContent sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Typography color="text.secondary" pt={0.5}>
                顧客の声総数
              </Typography>
              <Typography variant="h5">{voicingConnection?.total}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 一覧エリア */}
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
            <Typography variant="h6">顧客の声一覧</Typography>
          </Box>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="キーワードで検索..."
            sx={{ mb: 2 }}
          />
        </CardContent>

        {/* 一覧テーブル */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>顧客の声要約</TableCell>
              <TableCell>タグ</TableCell>
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
    </Box>
  );
};

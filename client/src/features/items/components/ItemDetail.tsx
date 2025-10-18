"use client";

import { useParams } from "next/navigation";
import { useGetItem } from "../hooks/useGetItem";
import { Loading } from "@/components/ui/Loading";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Stack,
} from "@mui/material";

export const ItemDetail = () => {
  const { itemId } = useParams() as { itemId: string };
  const { data, loading, error } = useGetItem(itemId);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">
          エラーが発生しました: {error.message}
        </Typography>
      </Box>
    );
  }

  if (!data?.getItem) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="text.secondary">
          アイテムが見つかりませんでした
        </Typography>
      </Box>
    );
  }

  const item = data.getItem;

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            {item.name}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Stack spacing={3}>
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                ID
              </Typography>
              <Typography variant="body1">{item.id}</Typography>
            </Box>

            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                種類
              </Typography>
              <Typography variant="body1">{item.kind}</Typography>
            </Box>

            {item.description && (
              <Box>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  説明
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                  {item.description}
                </Typography>
              </Box>
            )}

            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                作成日
              </Typography>
              <Typography variant="body1">
                {new Date(item.createdAt).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Stack,
  Alert,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { useFileUpload } from "../hooks/useFileUpload";

interface FileUploadProps {
  itemId: string;
}

export const FileUpload = ({ itemId }: FileUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadInfo, setUploadInfo] = useState<{
    presignedUrl: string;
    s3Key: string;
  } | null>(null);
  const { createItemFile, loading, error } = useFileUpload();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadInfo(null);
    }
  };

  const handleGenerateUrl = async () => {
    if (!selectedFile) {
      return;
    }

    try {
      const result = await createItemFile(itemId, selectedFile);
      if (!result) {
        throw new Error("Failed to create item file");
      }
    } catch (err) {
      console.error("Failed to create item file:", err);
    }
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={3}>
          <Typography variant="h6" gutterBottom>
            ファイルアップロード
          </Typography>

          <Box>
            <input
              accept="*/*"
              style={{ display: "none" }}
              id="file-upload-input"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload-input">
              <Button
                variant="outlined"
                component="span"
                startIcon={<CloudUpload />}
              >
                ファイルを選択
              </Button>
            </label>
          </Box>

          {selectedFile && (
            <Box>
              <Typography variant="body2" color="text.secondary">
                選択されたファイル:
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
              </Typography>
            </Box>
          )}

          {selectedFile && !uploadInfo && (
            <Button
              variant="contained"
              onClick={handleGenerateUrl}
              disabled={loading}
            >
              {loading ? "処理中..." : "アップロード準備"}
            </Button>
          )}

          {error && (
            <Alert severity="error">
              エラーが発生しました: {error.message}
            </Alert>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

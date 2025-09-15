"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@apollo/client/react";
import { graphql } from "@/gql";

const voiceSchema = z.object({
  content: z.string().min(1, "内容は必須です"),
  source: z.string().min(1, "ソースは必須です"),
});

type VoiceFormData = z.infer<typeof voiceSchema>;

interface VoiceCreateModalProps {
  open: boolean;
  onClose: () => void;
  productId: string;
}

const CREATE_VOICING_MUTATION = graphql(`
  mutation CreateVoicing($input: CreateVoicingInput!) {
    createVoicing(input: $input) {
      id
    }
  }
`);

export const VoiceCreateModal = ({
  open,
  onClose,
  productId,
}: VoiceCreateModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VoiceFormData>({
    resolver: zodResolver(voiceSchema),
    defaultValues: {
      content: "",
      source: "",
    },
  });

  const [createVoicing] = useMutation(CREATE_VOICING_MUTATION);

  const handleFormSubmit = (data: VoiceFormData) => {
    createVoicing({
      variables: {
        input: { ...data, source: "web", productId },
      },
    });
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>VoC (顧客の声) を追加</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="内容"
                  fullWidth
                  multiline
                  rows={4}
                  error={!!errors.content}
                  helperText={errors.content?.message}
                  placeholder="VoCの詳細内容を入力してください"
                />
              )}
            />

            <Controller
              name="source"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.source}>
                  <InputLabel>ソース</InputLabel>
                  <Select
                    {...field}
                    label="ソース"
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    <MenuItem value="インタビュー">インタビュー</MenuItem>
                    <MenuItem value="お問い合わせ">お問い合わせ</MenuItem>
                    <MenuItem value="営業">営業</MenuItem>
                    <MenuItem value="web">web</MenuItem>
                    <MenuItem value="マーケター">マーケター</MenuItem>
                    <MenuItem value="その他">その他</MenuItem>
                  </Select>
                  <FormHelperText>{errors.source?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isSubmitting}>
            キャンセル
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            作成
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

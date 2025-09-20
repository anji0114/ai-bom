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
import { GetVoicingsDocument } from "@/gql/graphql";

const voicingSchema = z.object({
  content: z.string().min(1, "内容は必須です"),
  source: z.string().min(1, "ソースは必須です"),
});

type VoicingFormData = z.infer<typeof voicingSchema>;

interface CreateVoicingModalProps {
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

export const CreateVoicingModal = ({
  open,
  onClose,
  productId,
}: CreateVoicingModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VoicingFormData>({
    resolver: zodResolver(voicingSchema),
    defaultValues: {
      content: "",
      source: "",
    },
  });

  const [createVoicing] = useMutation(CREATE_VOICING_MUTATION, {
    refetchQueries: [
      {
        query: GetVoicingsDocument,
        variables: { input: { productId } },
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleFormSubmit = async (data: VoicingFormData) => {
    try {
      await createVoicing({
        variables: {
          input: { ...data, source: data.source, productId },
        },
      });
      reset();
      onClose();
    } catch (error) {
      console.error("顧客の声作成エラー:", error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>要望・要求を追加</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
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
                    <MenuItem value="営業">営業</MenuItem>
                    <MenuItem value="CS">CS</MenuItem>
                    <MenuItem value="マーケティング">マーケティング</MenuItem>
                    <MenuItem value="製品開発">製品開発</MenuItem>
                    <MenuItem value="顧客">顧客</MenuItem>
                    <MenuItem value="経営">経営</MenuItem>
                    <MenuItem value="その他">その他</MenuItem>
                  </Select>
                  <FormHelperText>{errors.source?.message}</FormHelperText>
                </FormControl>
              )}
            />
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
                  placeholder="顧客の声の詳細内容を入力してください"
                />
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

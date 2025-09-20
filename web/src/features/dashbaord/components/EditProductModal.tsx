"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Product } from "@/gql/graphql";
import { useUpdateProduct } from "../hooks/updateProduct";
import { useEffect } from "react";

const productSchema = z.object({
  name: z.string().min(1, "プロダクト名は必須です"),
  description: z.string().optional(),
  content: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}

export const EditProductModal = ({
  open,
  onClose,
  product,
}: EditProductModalProps) => {
  const { updateProduct, loading } = useUpdateProduct();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      content: product?.content || "",
    },
  });

  const handleFormSubmit = async (data: ProductFormData) => {
    if (!product) return;

    try {
      await updateProduct({
        id: product.id,
        name: data.name,
        description: data.description || undefined,
        content: data.content || undefined,
      });
      onClose();
    } catch (error) {
      console.error("プロダクト更新エラー:", error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  // フォームの初期値をproductが変更されたときに更新
  const resetFormWithProduct = () => {
    if (product) {
      reset({
        name: product.name,
        description: product.description || "",
        content: product.content || "",
      });
    }
  };

  // モーダルが開いたときに初期値をリセット
  useEffect(() => {
    if (open && product) {
      resetFormWithProduct();
    }
  }, [open, product]);

  if (!product) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>プロダクト編集</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="プロダクト名"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  placeholder="プロダクト名を入力してください"
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="説明"
                  fullWidth
                  multiline
                  rows={3}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  placeholder="プロダクトの説明を入力してください"
                />
              )}
            />

            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="コンテンツ"
                  fullWidth
                  multiline
                  rows={4}
                  error={!!errors.content}
                  helperText={errors.content?.message}
                  placeholder="プロダクトのコンテンツを入力してください"
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isSubmitting || loading}>
            キャンセル
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting || loading}
          >
            更新
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

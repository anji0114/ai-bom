"use client";

import { graphql } from "@/gql";
import { useGetProducts } from "@/hooks/useGetProducts";
import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const productSchema = z.object({
  name: z.string().min(1, "名前は必須です"),
  description: z.string().optional(),
  content: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

const CREATE_PRODUCT_MUTATION = graphql(`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      description
      content
      createdAt
      updatedAt
    }
  }
`);

export const ProductNew = () => {
  const router = useRouter();
  const { products } = useGetProducts();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      content: "",
    },
  });

  const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION, {
    onCompleted: () => {
      reset();
      router.push("/dashboard");
    },
    refetchQueries: ["GetProducts"],
    awaitRefetchQueries: true,
  });

  const handleFormSubmit = (data: ProductFormData) => {
    createProduct({
      variables: {
        input: {
          name: data.name,
          description: data.description || undefined,
          content: data.content || undefined,
        },
      },
    });
  };
  return (
    <Box
      bgcolor={(theme) => theme.palette.grey[50]}
      p={4}
      borderRadius={2}
      minHeight="100vh"
    >
      <Container maxWidth="md">
        {!!products?.length && (
          <Box mb={2}>
            <Button
              startIcon={<ArrowBack />}
              href="/dashboard"
              component={Link}
            >
              ダッシュボードへ戻る
            </Button>
          </Box>
        )}
        <Card sx={{ p: 4, borderRadius: 4 }} variant="outlined">
          <Typography variant="h6" fontWeight={700}>
            新しいプロダクトを作成
          </Typography>

          <Box
            mt={3}
            sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="プロダクト名"
                  size="small"
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
                  size="small"
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
                  label="詳細内容"
                  fullWidth
                  size="small"
                  multiline
                  rows={4}
                  error={!!errors.content}
                  helperText={errors.content?.message}
                  placeholder="プロダクトの詳細内容を入力してください"
                />
              )}
            />

            <Button
              variant="contained"
              disabled={isSubmitting || !isValid}
              fullWidth
              onClick={handleSubmit(handleFormSubmit)}
            >
              作成
            </Button>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

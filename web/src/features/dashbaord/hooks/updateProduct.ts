"use client";

import { useMutation } from "@apollo/client/react";
import { useSetAtom } from "jotai";
import { graphql } from "@/gql";
import { UpdateProductInput, GetProductsDocument } from "@/gql/graphql";
import { currentProductAtom, setStoredProductId } from "@/atoms/productAtoms";

const UPDATE_PRODUCT_MUTATION = graphql(`
  mutation UpdateProduct($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      id
      name
      description
      content
      createdAt
      userId
      updatedAt
    }
  }
`);

export const useUpdateProduct = () => {
  const setCurrentProduct = useSetAtom(currentProductAtom);

  const [updateProductMutation, { loading, error }] = useMutation(
    UPDATE_PRODUCT_MUTATION,
    {
      update(cache, { data }) {
        if (data?.updateProduct) {
          const updatedProduct = data.updateProduct;

          // キャッシュのgetProductsを更新
          const existingProducts = cache.readQuery({
            query: GetProductsDocument,
          });

          if (existingProducts?.getProducts) {
            cache.evict({
              id: "GetProducts",
            });
          }

          // currentProductを更新
          setCurrentProduct(updatedProduct);
          setStoredProductId(updatedProduct.id);
        }
      },
    }
  );

  const updateProduct = async (input: UpdateProductInput) => {
    try {
      const result = await updateProductMutation({
        variables: { input },
      });
      return result.data?.updateProduct;
    } catch (err) {
      console.error("Failed to update product:", err);
      throw err;
    }
  };

  return {
    updateProduct,
    loading,
    error,
  };
};

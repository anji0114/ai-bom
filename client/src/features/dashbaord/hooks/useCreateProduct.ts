import { graphql } from "@/gql";
import { CreateProductDocument, CreateProductInput } from "@/gql/graphql";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";

graphql(`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
    }
  }
`);

export const useCreateProduct = () => {
  const router = useRouter();
  const [createProduct, { loading, error }] = useMutation(
    CreateProductDocument
  );

  const createProductMutation = (input: CreateProductInput) => {
    return createProduct({
      variables: { input },
      onCompleted: (data) => {
        router.push(`/products/${data.createProduct.id}`);
      },
      onError: (error) => {
        console.error(error);
      },
      update: (cache, { data }) => {
        cache.evict({ fieldName: "getProducts" });
      },
    });
  };

  return { createProduct: createProductMutation, loading, error };
};

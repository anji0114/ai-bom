import { useQuery } from "@apollo/client/react";
import { graphql } from "@/gql";
import { GetProductsDocument } from "@/gql/graphql";

graphql(`
  query GetProducts {
    getProducts {
      data {
        ...DashbaordLayoutFragment
      }
      total
    }
  }
`);

export const useGetProducts = () => {
  const { data, loading, error, refetch } = useQuery(GetProductsDocument);

  return {
    products: data?.getProducts.data,
    total: data?.getProducts.total || 0,
    loading,
    error,
    refetch,
  };
};

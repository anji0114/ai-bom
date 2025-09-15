import { useQuery } from "@apollo/client/react";
import { graphql } from "@/gql";

const GET_PRODUCTS_QUERY = graphql(`
  query GetProducts {
    getProducts {
      data {
        id
        name
        description
        content
        createdAt
        updatedAt
        userId
      }
      total
    }
  }
`);

export const useGetProducts = () => {
  const { data, loading, error, refetch } = useQuery(GET_PRODUCTS_QUERY, {
    fetchPolicy: "cache-first",
  });

  return {
    products: data?.getProducts.data,
    total: data?.getProducts.total || 0,
    loading,
    error,
    refetch,
  };
};

import { graphql } from "@/gql";
import { GetProductDocument, GetProductsDocument } from "@/gql/graphql";
import { useQuery } from "@apollo/client/react";

graphql(`
  query GetProducts {
    getProducts {
      ...ProductItem
    }
  }
`);

export const useGetProducts = () => {
  const { data, loading, error } = useQuery(GetProductsDocument);

  return { data, loading, error };
};

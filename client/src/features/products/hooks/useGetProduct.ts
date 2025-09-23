import { graphql } from "@/gql";
import { GetProductDocument } from "@/gql/graphql";
import { useQuery } from "@apollo/client/react";

graphql(`
  query GetProduct($id: String!) {
    getProduct(id: $id) {
      ...ProductDetail
    }
  }
`);

export const useGetProduct = (id: string) => {
  const { data, loading, error } = useQuery(GetProductDocument, {
    variables: { id },
  });

  return { data, loading, error };
};

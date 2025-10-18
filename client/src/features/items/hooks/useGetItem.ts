import { graphql } from "@/gql";
import { GetItemDocument } from "@/gql/graphql";
import { useQuery } from "@apollo/client/react";

graphql(`
  query GetItem($id: String!) {
    getItem(id: $id) {
      id
      name
      kind
      description
      createdAt
    }
  }
`);

export const useGetItem = (itemId: string) => {
  return useQuery(GetItemDocument, {
    variables: {
      id: itemId,
    },
  });
};

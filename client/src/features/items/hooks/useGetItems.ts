import { graphql } from "@/gql";
import { GetItemsDocument } from "@/gql/graphql";
import { useQuery } from "@apollo/client/react";

graphql(`
  query GetItems {
    getItems {
      ...ItemListFragment
    }
  }
`);

export const useGetItems = () => {
  return useQuery(GetItemsDocument);
};

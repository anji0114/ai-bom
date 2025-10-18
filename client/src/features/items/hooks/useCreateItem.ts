import { graphql } from "@/gql";
import { CreateItemDocument, CreateItemInput } from "@/gql/graphql";
import { useMutation } from "@apollo/client/react";

graphql(`
  mutation CreateItem($input: CreateItemInput!) {
    createItem(input: $input) {
      id
      name
    }
  }
`);

export const useCreateItem = () => {
  const [mutate, { loading, error }] = useMutation(CreateItemDocument);

  const createItem = (input: CreateItemInput) => {
    return mutate({
      variables: { input },
    });
  };

  return { createItem, loading, error };
};

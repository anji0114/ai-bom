import { graphql } from "@/gql";
import { CreateItemDocument, CreateItemInput } from "@/gql/graphql";
import { getTenantId } from "@/lib/getTenantId";
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
  const tenantId = getTenantId();

  const createItem = (input: Omit<CreateItemInput, "tenantId">) => {
    return mutate({
      variables: { input: { ...input, tenantId } },
    });
  };

  return { createItem, loading, error };
};

import { graphql } from "@/gql";
import { LogoutDocument } from "@/gql/graphql";
import { useMutation } from "@apollo/client/react";

graphql(`
  mutation Logout {
    logout
  }
`);

export const useLogout = () => {
  const [logout, { loading, error }] = useMutation(LogoutDocument);
  return { logout, loading, error };
};

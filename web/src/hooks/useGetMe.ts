import { graphql, useFragment } from "@/gql";
import { GetmeDocument } from "@/gql/graphql";
import { useQuery } from "@apollo/client/react";

graphql(`
  query Getme {
    getMe {
      ...Me
    }
  }
`);

const fragment = graphql(`
  fragment Me on User {
    id
  }
`);

export const useGetMe = () => {
  const { data, loading, error } = useQuery(GetmeDocument, {
    pollInterval: 60 * 60 * 1000,
  });
  const meData = useFragment(fragment, data?.getMe);

  return { data: meData, loading, error };
};

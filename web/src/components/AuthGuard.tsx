"use client";

import { ReactNode, useEffect } from "react";

import { useQuery } from "@apollo/client/react";
import { graphql, useFragment } from "@/gql";
import { GetmeDocument } from "@/gql/graphql";
import { useRouter } from "next/navigation";
import { Loading } from "./ui/Loading";

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

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { data, loading, error } = useQuery(GetmeDocument);
  const meData = useFragment(fragment, data?.getMe);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !error) {
      if (!meData) {
        router.push("/");
      }
    }
  }, [data, loading, error]);

  if (loading || !meData) {
    return <Loading />;
  }

  return <>{children}</>;
};

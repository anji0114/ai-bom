"use client";

import { ReactNode, useEffect, useState } from "react";

import { useQuery } from "@apollo/client/react";
import { graphql, useFragment } from "@/gql";
import { GetmeDocument } from "@/gql/graphql";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/ui/Loading";

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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { data, loading, error } = useQuery(GetmeDocument, {
    pollInterval: 60 * 60 * 1000,
  });
  const meData = useFragment(fragment, data?.getMe);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !loading && !error) {
      if (!meData) {
        router.push("/");
      }
    }
  }, [isMounted, meData, loading, error, router]);

  if (!isMounted || loading) {
    return <Loading />;
  }

  if (!meData) {
    return <Loading />;
  }

  return <>{children}</>;
};

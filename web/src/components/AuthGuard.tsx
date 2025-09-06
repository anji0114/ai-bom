"use client";

import { ReactNode, useEffect, useState } from "react";

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
  const [isMounted, setIsMounted] = useState(false);
  const { data, loading, error } = useQuery(GetmeDocument);
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

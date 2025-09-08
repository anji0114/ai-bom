"use client";

import { ReactNode, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { Loading } from "@/components/ui/Loading";
import { useGetMe } from "@/hooks/useGetMe";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { data, loading, error } = useGetMe();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !loading && !error) {
      if (!data) {
        router.push("/");
      }
    }
  }, [isMounted, data, loading, error, router]);

  if (!isMounted || loading) {
    return <Loading />;
  }

  if (!data) {
    return <Loading />;
  }

  return <>{children}</>;
};

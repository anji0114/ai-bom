"use client";

import { ReactNode, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { Loading } from "@/components/ui/Loading";
import { useGetMe } from "@/hooks/useGetMe";
import { refreshedToken } from "@/lib/refreshToken";
import { useAtom } from "jotai";
import { currentUserAtom } from "@/atoms/userAtoms";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { data, loading } = useGetMe();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !loading) {
      const getRefreshToken = async () => {
        try {
          const user = await refreshedToken();
          setCurrentUser({
            id: user.user.sub,
            email: user.user.username,
          });
        } catch (error) {
          setCurrentUser(null);
          router.push("/");
        }
      };

      if (!data) {
        getRefreshToken();
        return;
      }

      setCurrentUser(data);
    }
  }, [isMounted, data, loading, router, setCurrentUser]);

  if (!isMounted || loading || !currentUser) {
    return <Loading />;
  }

  return <>{children}</>;
};

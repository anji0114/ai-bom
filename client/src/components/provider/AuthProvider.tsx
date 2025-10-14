"use client";

import { ReactNode, useEffect } from "react";

import { useRouter } from "next/navigation";
import { Loading } from "@/components/ui/Loading";
import { useGetMe } from "@/hooks/useGetMe";
import { refreshedToken } from "@/lib/refreshToken";
import { useAtom } from "jotai";
import { currentUserAtom } from "@/atoms/userAtoms";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, loading } = useGetMe();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  useEffect(() => {
    if (!loading) {
      const getRefreshToken = async () => {
        try {
          const user = await refreshedToken();
          setCurrentUser({
            id: user.user.sub,
            email: user.user.username,
            name: user.user.name,
            role: user.user.role,
            tenant: user.user.tenant,
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
  }, [data, loading, router, setCurrentUser]);

  if (loading || !currentUser) {
    return <Loading />;
  }

  return <>{children}</>;
};

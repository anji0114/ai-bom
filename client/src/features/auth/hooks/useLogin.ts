import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/constants/url";

type LoginVariables = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async ({ variables }: { variables: LoginVariables }) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: variables.email,
          password: variables.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      router.push("/dashboard");
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

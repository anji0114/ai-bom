import { useState } from "react";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async ({
    variables,
  }: {
    variables: { email: string; password: string };
  }) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username: variables.email,
            password: variables.password,
          }),
        }
      );

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

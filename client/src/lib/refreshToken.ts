import { apiUrl } from "@/constants/url";

type RefreshTokenResponse = {
  success: true;
  user: {
    sub: string;
    username: string;
    name: string;
    role: string;
    tenant: {
      id: string;
      name: string;
    };
  };
};

export const refreshedToken = async (): Promise<RefreshTokenResponse> => {
  try {
    const response = await fetch(`${apiUrl}/api/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

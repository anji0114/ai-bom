export type AuthenticatedRequest = {
  user: {
    username: string;
    sub: string;
  };
};

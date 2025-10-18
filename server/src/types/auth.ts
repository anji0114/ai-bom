import { Request } from 'express';

export type CurrentUser = {
  username: string;
  sub: string;
};

export type AuthenticatedRequest = Request & {
  user?: CurrentUser;
};

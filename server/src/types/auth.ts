import { Request } from 'express';

export type CurrentUser = {
  username: string;
  sub: string;
};

export interface AuthenticatedRequest extends Request {
  user?: CurrentUser;
}

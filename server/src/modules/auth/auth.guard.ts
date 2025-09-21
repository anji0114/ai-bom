import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { AuthService } from './auth.service';

interface AuthenticatedRequest extends Request {
  user?: {
    username: string;
    sub: string;
  };
}

interface GqlContext {
  req: AuthenticatedRequest;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const gqlContext: GqlContext = ctx.getContext();
    const request = gqlContext.req;
    const accessToken = request.cookies?.accessToken as string;

    if (!accessToken || typeof accessToken !== 'string') {
      throw new HttpException(
        'Access token is required',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const isValid = await this.authService.verifyAccessToken(accessToken);

      if (!isValid) {
        return false;
      }

      const idToken = request.cookies?.idToken as string;
      if (!idToken || typeof idToken !== 'string') {
        return false;
      }

      const userInfo = await this.authService.getUserIdFromIdToken(idToken);
      request.user = userInfo;
      return true;
    } catch {
      return false;
    }
  }
}

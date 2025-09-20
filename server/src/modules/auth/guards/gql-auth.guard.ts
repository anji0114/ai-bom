import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '../auth.service';

export interface RequestWithUser extends Request {
  user?: { id: string };
  cookies?: { session?: string };
}

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req }: { req: RequestWithUser } = ctx.getContext();

    const sessionToken = req.cookies?.session;

    if (!sessionToken) {
      throw new UnauthorizedException('認証が必要です。ログインしてください。');
    }

    const session = await this.authService.validateSession(sessionToken);

    if (!session?.userId) {
      throw new UnauthorizedException(
        'セッションが無効です。再度ログインしてください。',
      );
    }

    req.user = { id: session.userId };
    return true;
  }
}

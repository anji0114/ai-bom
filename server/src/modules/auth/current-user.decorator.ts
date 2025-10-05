import { AuthenticatedRequest } from '@/types/auth';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

interface GqlContext {
  req: AuthenticatedRequest;
}

export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    // GraphQLコンテキストの場合
    const gqlContext = GqlExecutionContext.create(context);
    const ctx: GqlContext = gqlContext.getContext();

    if (ctx?.req) {
      return ctx.req.user;
    }

    // HTTPコンテキストの場合
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    return request.user;
  },
);

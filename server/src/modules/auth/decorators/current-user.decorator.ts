import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { RequestWithUser } from '../guards/gql-auth.guard';

export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const { req }: { req: RequestWithUser } = ctx.getContext();
    return req.user;
  },
);

import { Resolver, Query, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthenticatedUser } from '@/modules/auth/user.entity';
import { AuthGuard } from '@/modules/auth/auth.guard';
import { PrismaService } from '@/prisma/prisma.service';

interface AuthenticatedRequest {
  user: {
    username: string;
    sub: string;
  };
}

@Resolver()
export class UserResolver {
  constructor(private prismaService: PrismaService) {}

  @Query(() => AuthenticatedUser)
  @UseGuards(AuthGuard)
  async getMe(
    @Context() context: { req: AuthenticatedRequest },
  ): Promise<AuthenticatedUser> {
    const user = context.req.user;
    const userId = user.sub;

    const dbUser = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!dbUser) {
      throw new Error('User not found');
    }

    return {
      id: dbUser.id,
      email: dbUser.email,
      isAuthenticated: true,
    };
  }
}

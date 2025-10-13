import { Resolver, Query, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthenticatedUser } from '@/modules/auth/user.entity';
import { AuthGuard } from '@/modules/auth/auth.guard';
import { PrismaService } from '@/prisma/prisma.service';
import { AuthenticatedRequest } from '@/types/auth';

@Resolver()
export class UserResolver {
  constructor(private prismaService: PrismaService) {}

  @Query(() => AuthenticatedUser)
  @UseGuards(AuthGuard)
  async getMe(
    @Context() context: { req: AuthenticatedRequest },
  ): Promise<AuthenticatedUser> {
    const user = context.req.user;
    const userId = user?.sub;

    const dbUser = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: {
        tenant: true,
      },
    });

    if (!dbUser) {
      throw new Error('User not found');
    }

    return {
      id: dbUser.id,
      email: dbUser.email,
      name: dbUser.name,
      role: dbUser.role || '',
      tenant: {
        id: dbUser.tenant.id,
        name: dbUser.tenant.name,
      },
      isAuthenticated: true,
    };
  }
}

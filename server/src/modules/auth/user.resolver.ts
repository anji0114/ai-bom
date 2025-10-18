import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthenticatedUser } from '@/modules/auth/user.entity';
import { AuthGuard } from '@/modules/auth/auth.guard';
import { UserService } from '@/modules/auth/user.service';
import { CurrentUser } from '@/modules/auth/current-user.decorator';
import { CurrentUser as CurrentUserType } from '@/types/auth';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => AuthenticatedUser)
  @UseGuards(AuthGuard)
  async getMe(
    @CurrentUser() currentUser: CurrentUserType,
  ): Promise<AuthenticatedUser> {
    const userId = currentUser?.sub;

    if (!userId) {
      throw new Error('User not authenticated');
    }

    const user = await this.userService.findById(userId);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role || '',
      tenant: {
        id: user.tenant.id,
        name: user.tenant.name,
      },
      isAuthenticated: true,
    };
  }
}

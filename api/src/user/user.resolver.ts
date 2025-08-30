import { Query, Resolver } from '@nestjs/graphql';
import { User as UserModel } from '@/user/user.model';
import { UserService } from '@/user/user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserModel])
  users(): UserModel[] {
    return this.userService.findAll();
  }
}

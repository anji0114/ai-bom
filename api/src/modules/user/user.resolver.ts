import { Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.model';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  hello(): string {
    return this.userService.getHello();
  }

  @Query(() => User) // "user" queryを追加
  getUser(): User {
    return this.userService.getUser();
  }
}

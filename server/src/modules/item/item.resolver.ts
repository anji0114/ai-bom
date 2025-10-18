import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Item } from './item.entity';
import { ItemService } from './item.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CreateItemInput } from './dto/create-item.input';
import { CurrentUser } from '../auth/current-user.decorator';
import { CurrentUser as CurrentUserType } from '@/types/auth';
import { UserService } from '../auth/user.service';

@Resolver(() => Item)
export class ItemResolver {
  constructor(
    private readonly itemService: ItemService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [Item])
  @UseGuards(AuthGuard)
  async getItems(@CurrentUser() currentUser: CurrentUserType): Promise<Item[]> {
    const user = await this.userService.findById(currentUser.sub);
    return this.itemService.getItems(user.tenantId);
  }

  @Mutation(() => Item)
  @UseGuards(AuthGuard)
  async createItem(
    @Args('input') input: CreateItemInput,
    @CurrentUser() currentUser: CurrentUserType,
  ): Promise<Item> {
    const user = await this.userService.findById(currentUser.sub);
    return this.itemService.createItem(user.tenantId, input);
  }
}

import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { Item } from './item.entity';
import { ItemService } from './item.service';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AuthenticatedRequest } from '@/types/auth';
import { CreateItemInput } from './dto/create-item.input';

@Resolver(() => Item)
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}

  @Query(() => [Item])
  @UseGuards(AuthGuard)
  getItems(@Context() context: { req: AuthenticatedRequest }): Promise<Item[]> {
    const userId = context.req.user?.sub;

    if (!userId) {
      throw new NotFoundException('User not found');
    }

    return this.itemService.getItems(userId);
  }

  @Mutation(() => Item)
  @UseGuards(AuthGuard)
  createItem(
    @Args('input') input: CreateItemInput,
    @Context() context: { req: AuthenticatedRequest },
  ): Promise<Item> {
    const userId = context.req.user?.sub;

    if (!userId) {
      throw new NotFoundException('User not found');
    }

    return this.itemService.createItem(input);
  }
}

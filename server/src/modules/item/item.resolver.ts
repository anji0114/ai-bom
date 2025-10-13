import { Resolver, Query, Context } from '@nestjs/graphql';
import { Item } from './item.entity';
import { ItemService } from './item.service';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AuthenticatedRequest } from '@/types/auth';

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
}

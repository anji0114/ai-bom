import { Resolver, Query, Context } from '@nestjs/graphql';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AuthenticatedRequest } from '@/types/auth';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product])
  @UseGuards(AuthGuard)
  getProducts(
    @Context() context: { req: AuthenticatedRequest },
  ): Promise<Product[]> {
    const userId = context.req.user.sub;

    return this.productService.getProducts(userId);
  }
}

import { Resolver, Query, Context, Mutation, Args } from '@nestjs/graphql';
import { CreateProductInput, Product } from './product.entity';
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

  @Query(() => Product)
  @UseGuards(AuthGuard)
  getProduct(@Args('id') id: string): Promise<Product> {
    return this.productService.getProduct(id);
  }

  @Mutation(() => Product)
  @UseGuards(AuthGuard)
  createProduct(
    @Context() context: { req: AuthenticatedRequest },
    @Args('input') input: CreateProductInput,
  ): Promise<Product> {
    const userId = context.req.user.sub;

    return this.productService.createProduct(userId, input);
  }
}

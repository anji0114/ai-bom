import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product, ProductConnection } from './entities/product.entity';
import { CreateProductInput, UpdateProductInput } from './dto/product.input';
import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { GqlAuthGuard } from '@/modules/auth/guards/gql-auth.guard';

@Resolver(() => Product)
@UseGuards(GqlAuthGuard)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  async createProduct(
    @Args('input') input: CreateProductInput,
    @CurrentUser() user: { id: string },
  ) {
    return this.productService.create(user.id, input);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('input') input: UpdateProductInput,
    @CurrentUser() user: { id: string },
  ) {
    return this.productService.update(user.id, input);
  }

  @Query(() => Product, { nullable: true })
  async getProduct(
    @Args('id') id: string,
    @CurrentUser() user: { id: string },
  ) {
    return this.productService.findOne(id, user.id);
  }

  @Query(() => ProductConnection)
  async getProducts(@CurrentUser() user: { id: string }) {
    const { data, total } = await this.productService.findAll(user.id);

    return {
      data,
      total,
    };
  }
}

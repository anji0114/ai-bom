import { Resolver, Query } from '@nestjs/graphql';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product])
  getProducts(): Product[] {
    return this.productService.getProducts();
  }
}

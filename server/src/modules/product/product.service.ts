import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getProducts(userId: string): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: {
        userId: userId,
      },
    });

    return products;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateProductInput, Product } from './product.entity';
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

  async getProduct(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id: id },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  async createProduct(
    userId: string,
    input: CreateProductInput,
  ): Promise<Product> {
    const product = await this.prisma.product.create({
      data: { ...input, userId: userId },
    });

    return product;
  }
}

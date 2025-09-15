import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateProductInput } from './dto/create-product.input';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, input: CreateProductInput) {
    return this.prisma.product.create({
      data: {
        userId,
        name: input.name,
        description: input.description,
        content: input.content,
      },
    });
  }

  async findOne(id: string, userId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('指定されたプロダクトが見つかりません');
    }

    if (product.userId !== userId) {
      throw new ForbiddenException(
        '他のユーザーのプロダクトにはアクセスできません',
      );
    }

    return product;
  }

  async findAll(userId: string) {
    const products = await this.prisma.product.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    const total = await this.prisma.product.count({ where: { userId } });

    return {
      data: products,
      total,
    };
  }
}

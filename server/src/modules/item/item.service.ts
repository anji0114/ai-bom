import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from './item.entity';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateItemInput } from './dto/create-item.input';

type RecordItem = Record<string, any>;

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  async getItems(tenantId: string): Promise<Item[]> {
    const items = await this.prisma.item.findMany({
      where: {
        tenantId: tenantId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return items.map((item) => ({
      ...item,
      attributes: item.attributes as RecordItem,
      metadata: item.metadata as RecordItem,
      files: [],
    }));
  }

  async getItem(tenantId: string, itemId: string): Promise<Item> {
    const item = await this.prisma.item.findFirst({
      where: {
        id: itemId,
        tenantId: tenantId,
      },
      include: {
        files: {
          orderBy: {
            createdAt: 'asc',
          },
          take: 1,
        },
      },
    });

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    const files = item.files.map((file) => ({
      ...file,
      url: 'https://google.com',
      metadata: file.metadata as RecordItem,
    }));

    return {
      ...item,
      attributes: item.attributes as RecordItem,
      metadata: item.metadata as RecordItem,
      files,
    };
  }

  async createItem(tenantId: string, input: CreateItemInput): Promise<Item> {
    const item = await this.prisma.item.create({
      data: {
        tenantId,
        name: input.name,
        kind: input.kind,
        description: input.description,
        attributes: input.attributes,
        metadata: input.metadata,
      },
    });

    return {
      ...item,
      attributes: item.attributes as RecordItem,
      metadata: item.metadata as RecordItem,
      files: [],
    };
  }
}

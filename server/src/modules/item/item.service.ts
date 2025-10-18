import { Injectable } from '@nestjs/common';
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
    });

    return items.map((item) => ({
      ...item,
      attributes: item.attributes as RecordItem,
      metadata: item.metadata as RecordItem,
    }));
  }

  async createItem(input: CreateItemInput): Promise<Item> {
    const item = await this.prisma.item.create({
      data: {
        tenantId: input.tenantId,
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
    };
  }
}

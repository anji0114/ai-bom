import { Injectable } from '@nestjs/common';
import { Item } from './item.entity';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  async getItems(tenantId: string): Promise<Item[]> {
    const items = await this.prisma.item.findMany({
      where: {
        tenantId: tenantId,
      },
    });

    return items;
  }
}

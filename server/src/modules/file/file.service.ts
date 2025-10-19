import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { File } from './file.entity';
import { CreateFileInput } from './dto/create-file.input';

type RecordType = Record<string, any>;

@Injectable()
export class FileService {
  constructor(private readonly prisma: PrismaService) {}

  async createFile(tenantId: string, input: CreateFileInput): Promise<File> {
    // itemIdがテナントに属しているか確認
    const item = await this.prisma.item.findFirst({
      where: {
        id: input.itemId,
        tenantId: tenantId,
      },
    });

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    // folderIdが指定されている場合、それがitemに属しているか確認
    if (input.folderId) {
      const folder = await this.prisma.folder.findFirst({
        where: {
          id: input.folderId,
          itemId: input.itemId,
        },
      });

      if (!folder) {
        throw new NotFoundException('Folder not found');
      }
    }

    const file = await this.prisma.file.create({
      data: {
        itemId: input.itemId,
        folderId: input.folderId,
        name: input.name,
        fileType: input.fileType,
        s3Key: input.s3Key,
        metadata: input.metadata,
      },
    });

    return {
      ...file,
      url: 'https://google.com',
      metadata: file.metadata as RecordType,
    };
  }
}

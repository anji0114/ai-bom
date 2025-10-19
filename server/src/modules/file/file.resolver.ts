import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { CurrentUser as CurrentUserType } from '@/types/auth';
import { UserService } from '../auth/user.service';
import { S3Service } from '../s3/s3.service';
import { PrismaService } from '@/prisma/prisma.service';
import { FileService } from './file.service';
import { File } from './file.entity';
import { GeneratePresignedUploadUrlInput } from './dto/generate-presigned-upload-url.input';
import { PresignedUploadUrlOutput } from './dto/presigned-upload-url.output';
import { CreateFileInput } from './dto/create-file.input';

@Resolver()
export class FileResolver {
  constructor(
    private readonly s3Service: S3Service,
    private readonly fileService: FileService,
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => PresignedUploadUrlOutput)
  @UseGuards(AuthGuard)
  async generatePresignedUploadUrl(
    @Args('input') input: GeneratePresignedUploadUrlInput,
    @CurrentUser() currentUser: CurrentUserType,
  ): Promise<PresignedUploadUrlOutput> {
    const user = await this.userService.findById(currentUser.sub);

    // itemIdがユーザーのテナントに属しているか確認
    const item = await this.prisma.item.findFirst({
      where: {
        id: input.itemId,
        tenantId: user.tenantId,
      },
    });

    if (!item) {
      throw new Error('Item not found');
    }

    const result = await this.s3Service.generatePresignedUploadUrl(
      input.fileName,
      input.contentType,
      user.tenantId,
    );

    return result;
  }

  @Mutation(() => File)
  @UseGuards(AuthGuard)
  async createFile(
    @Args('input') input: CreateFileInput,
    @CurrentUser() currentUser: CurrentUserType,
  ): Promise<File> {
    const user = await this.userService.findById(currentUser.sub);

    // s3Keyがユーザーのテナントに属しているか確認
    if (!input.s3Key.startsWith(`${user.tenantId}/`)) {
      throw new Error('Access denied');
    }

    return await this.fileService.createFile(user.tenantId, input);
  }
}

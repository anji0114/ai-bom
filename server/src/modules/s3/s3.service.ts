import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get('AWS_REGION') as string,
      endpoint: this.configService.get('AWS_ENDPOINT') as string,
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID') as string,
        secretAccessKey: this.configService.get(
          'AWS_SECRET_ACCESS_KEY',
        ) as string,
      },
      forcePathStyle: true, // LocalStack用に必要
    });
    this.bucketName = this.configService.get('S3_BUCKET_NAME') as string;
  }

  async uploadImage(
    file: Express.Multer.File,
    tenantId: string,
  ): Promise<{ s3Key: string }> {
    const uuid = uuidv4();
    const safeName = file.originalname.replace(/\s+/g, '_');
    const key = `${tenantId}/files/${uuid}-${safeName}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.s3Client.send(command);
    return { s3Key: key }; // s3Keyを返す
  }

  async generatePresignedUploadUrl(
    fileName: string,
    contentType: string,
    tenantId: string,
  ): Promise<{ presignedUrl: string; s3Key: string }> {
    const uuid = uuidv4();
    const safeName = fileName.replace(/\s+/g, '_');
    const s3Key = `${tenantId}/files/${uuid}-${safeName}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: s3Key,
      ContentType: contentType,
    });

    const presignedUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: 900, // 15分
    });

    return { presignedUrl, s3Key };
  }

  async generatePresignedGetUrl(s3Key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: s3Key,
    });

    const presignedUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: 60 * 60, // 1時間
    });

    return presignedUrl;
  }
}

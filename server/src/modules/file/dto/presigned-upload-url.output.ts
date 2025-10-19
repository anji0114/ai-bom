import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PresignedUploadUrlOutput {
  @Field()
  presignedUrl: string;

  @Field()
  s3Key: string;
}

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GeneratePresignedUploadUrlInput {
  @Field()
  fileName: string;

  @Field()
  contentType: string;

  @Field()
  itemId: string;

  @Field({ nullable: true })
  folderId?: string;
}

import { InputType, Field } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class CreateFileInput {
  @Field()
  itemId: string;

  @Field({ nullable: true })
  folderId?: string;

  @Field()
  name: string;

  @Field()
  fileType: string;

  @Field()
  s3Key: string;

  @Field(() => GraphQLJSON, { nullable: true })
  metadata?: Record<string, any>;
}

import { ObjectType, Field, ID } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class File {
  @Field(() => ID)
  id: string;

  @Field()
  itemId: string;

  @Field(() => String, { nullable: true })
  folderId?: string | null;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  fileType?: string | null;

  @Field()
  s3Key: string;

  @Field()
  url: string;

  @Field(() => GraphQLJSON, { nullable: true })
  metadata?: Record<string, any> | null;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

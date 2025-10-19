import { ObjectType, Field, ID } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { File } from '../file/file.entity';

@ObjectType()
export class Item {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  kind: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => GraphQLJSON, { nullable: true })
  attributes?: Record<string, any> | null;

  @Field(() => GraphQLJSON, { nullable: true })
  metadata?: Record<string, any> | null;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  tenantId: string;

  @Field(() => [File])
  files: File[];
}

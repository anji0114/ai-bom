import { InputType, Field } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class CreateItemInput {
  @Field()
  name: string;

  @Field()
  kind: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  attributes?: Record<string, any>;

  @Field(() => GraphQLJSON, { nullable: true })
  metadata?: Record<string, any>;
}

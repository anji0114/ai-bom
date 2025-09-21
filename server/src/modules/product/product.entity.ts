import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => ID)
  userId: string;
}

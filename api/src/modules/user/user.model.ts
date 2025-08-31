import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType() // GraphQLの "type User" を表す
export class User {
  @Field(() => Int) // GraphQLの "id: Int!"
  id: number;

  @Field(() => String) // GraphQLの "name: String!"
  name: string;

  @Field(() => Boolean, { nullable: true }) // "isActive: Boolean" (null可)
  isActive?: boolean;
}

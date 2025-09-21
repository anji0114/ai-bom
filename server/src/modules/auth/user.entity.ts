import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class AuthenticatedUser {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  isAuthenticated: boolean;
}

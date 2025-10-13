import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Tenant {
  @Field()
  id: string;

  @Field()
  name: string;
}

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
  name: string;

  @Field()
  role: string;

  @Field()
  isAuthenticated: boolean;

  @Field()
  tenant: Tenant;
}

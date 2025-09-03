import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CustomerCategory {
  @Field(() => String)
  slug: string;

  @Field(() => String)
  name: string;
}

@ObjectType()
export class CustomerFeedback {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  content: string;

  @Field(() => String, { nullable: true })
  customerIdentifier: string | null;

  @Field(() => [CustomerCategory], { nullable: true })
  autoCategories: CustomerCategory[] | null;
}

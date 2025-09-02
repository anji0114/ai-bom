import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CustomerFeedback {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  content: string;

  @Field(() => String, { nullable: true })
  customerIdentifier: string | null;

  @Field(() => [String], { nullable: true })
  autoCategories: string[] | null;
}

import { ObjectType, Field, ID, Int, registerEnumType } from '@nestjs/graphql';
import { Sentiment } from '@prisma/client';

registerEnumType(Sentiment, {
  name: 'Sentiment',
});

@ObjectType()
export class Tag {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  createdAt: Date;
}

@ObjectType()
export class Voicing {
  @Field(() => ID)
  id: string;

  @Field()
  content: string;

  @Field()
  source: string;

  @Field({ nullable: true })
  summary?: string;

  @Field(() => Sentiment, { nullable: true })
  sentiment?: Sentiment;

  @Field(() => Int, { nullable: true })
  impactScore?: number;

  @Field(() => [Tag])
  tags: Tag[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

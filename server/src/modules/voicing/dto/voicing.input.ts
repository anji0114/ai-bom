import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateVoicingInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  productId: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  content: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  source: string;
}

@InputType()
export class GetVoicingsInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  productId: string;
}

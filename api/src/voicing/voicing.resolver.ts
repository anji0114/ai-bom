import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { VoicingService } from './voicing.service';
import { Voicing } from './entities/voicing.entity';
import { CreateVoicingInput } from './dto/create-voicing.input';
import { CurrentUser } from '../modules/auth/decorators/current-user.decorator';
import { GqlAuthGuard } from '../modules/auth/guards/gql-auth.guard';

@Resolver(() => Voicing)
@UseGuards(GqlAuthGuard)
export class VoicingResolver {
  constructor(private readonly voicingService: VoicingService) {}

  @Mutation(() => Voicing)
  async createVoicing(
    @Args('input') input: CreateVoicingInput,
    @CurrentUser() user: { id: string },
  ) {
    return this.voicingService.create(user.id, input);
  }

  @Query(() => Voicing, { nullable: true })
  async getVoicing(
    @Args('id') id: string,
    @CurrentUser() user: { id: string },
  ) {
    return this.voicingService.findOne(id, user.id);
  }

  @Query(() => [Voicing])
  async getVoicings(@CurrentUser() user: { id: string }) {
    return this.voicingService.findMany(user.id);
  }
}

import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { VoicingService } from './voicing.service';
import { Voicing, VoicingConnection } from './entities/voicing.entity';
import { CreateVoicingInput, GetVoicingsInput } from './dto/voicing.input';
import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { GqlAuthGuard } from '@/modules/auth/guards/gql-auth.guard';

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

  @Query(() => VoicingConnection)
  async getVoicings(
    @Args('input') input: GetVoicingsInput,
    @CurrentUser() user: { id: string },
  ) {
    const { data, total } = await this.voicingService.getVoicings(
      user.id,
      input.productId,
    );

    return {
      data,
      total,
    };
  }
}

import { Query, Resolver } from '@nestjs/graphql';
import { CustomerFeedback } from './feedbak.model';
import { FeedbackService } from './feedback.service';

@Resolver()
export class FeedbackResolver {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Query(() => [CustomerFeedback])
  getFeedbacks(): Promise<CustomerFeedback[]> {
    return this.feedbackService.getFeedbacks();
  }
}

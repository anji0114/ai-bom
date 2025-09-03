import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { CustomerFeedback } from './feedbak.model';
import { FeedbackService } from './feedback.service';

@Resolver()
export class FeedbackResolver {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Query(() => [CustomerFeedback])
  getFeedbacks(): Promise<CustomerFeedback[]> {
    return this.feedbackService.getFeedbacks();
  }

  @Mutation(() => CustomerFeedback)
  createFeedback(): Promise<CustomerFeedback> {
    const feedback = {
      content: 'test',
      customerIdentifier: 'test',
      autoCategories: [],
    };

    return this.feedbackService.createFeedback(feedback);
  }
}

import { Module } from '@nestjs/common';
import { FeedbackResolver } from './feedback.resolver';
import { FeedbackService } from './feedback.service';

@Module({
  imports: [],
  providers: [FeedbackResolver, FeedbackService],
})
export class FeedbackModule {}

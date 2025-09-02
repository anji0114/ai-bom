import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CustomerFeedback } from './feedbak.model';

@Injectable()
export class FeedbackService {
  constructor(private readonly prismaService: PrismaService) {}
  async getFeedbacks(): Promise<CustomerFeedback[]> {
    const feedbacks = await this.prismaService.customerFeedback.findMany();
    const autoCategories = feedbacks.map(
      (feedback) => feedback.autoCategories as string,
    );

    return feedbacks.map((feedback) => ({
      ...feedback,
      autoCategories,
    }));
  }
}

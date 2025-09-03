import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CustomerFeedback } from './feedbak.model';

@Injectable()
export class FeedbackService {
  constructor(private readonly prismaService: PrismaService) {}
  async getFeedbacks(): Promise<CustomerFeedback[]> {
    const feedbacks =
      (await this.prismaService.customerFeedback.findMany()) as CustomerFeedback[];

    return feedbacks;
  }

  async createFeedback(
    feedback: Omit<CustomerFeedback, 'id'>,
  ): Promise<CustomerFeedback> {
    const createdFeedback = await this.prismaService.customerFeedback.create({
      data: {
        content: feedback.content,
        customerIdentifier: feedback.customerIdentifier,
      },
    });

    return createdFeedback as CustomerFeedback;
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { AuthProvider, User } from '@prisma/client';
import { SessionService, SessionWithUser } from './session.service';
import { GoogleUser } from './strategies/google.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sessionService: SessionService,
  ) {}

  async validateGoogleUser(googleUser: GoogleUser): Promise<User> {
    const { googleId, email, name, picture } = googleUser;

    // ユーザーをemailで検索
    let user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // 新規ユーザー作成
      user = await this.prisma.user.create({
        data: {
          email,
          name,
          image: picture,
        },
      });
    }

    // Googleアカウント情報を検索または作成
    const existingAccount = await this.prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: AuthProvider.GOOGLE,
          providerAccountId: googleId,
        },
      },
    });

    if (!existingAccount) {
      await this.prisma.account.create({
        data: {
          userId: user.id,
          provider: AuthProvider.GOOGLE,
          providerAccountId: googleId,
        },
      });
    }

    return user;
  }

  async createSession(userId: string): Promise<SessionWithUser> {
    return this.sessionService.createSession(userId);
  }

  async validateSession(sessionToken: string): Promise<SessionWithUser | null> {
    return this.sessionService.validateSession(sessionToken);
  }

  async deleteSession(sessionToken: string): Promise<boolean> {
    return this.sessionService.deleteSession(sessionToken);
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Session, User } from '@prisma/client';
import { randomBytes } from 'crypto';

export interface SessionWithUser extends Session {
  user: User;
}

@Injectable()
export class SessionService {
  constructor(private readonly prisma: PrismaService) {}

  async createSession(userId: string): Promise<SessionWithUser> {
    // 有効なセッション数をチェック
    const activeSessions = await this.prisma.session.findMany({
      where: {
        userId,
        expires: { gt: new Date() }, // 有効なセッションのみ
      },
      orderBy: { createdAt: 'asc' }, // 古い順
    });

    // 3個以上の場合、最古のセッションを削除
    if (activeSessions.length >= 3) {
      const sessionsToDelete = activeSessions.slice(
        0,
        activeSessions.length - 2,
      );
      for (const session of sessionsToDelete) {
        await this.deleteSession(session.sessionToken);
      }
    }

    // 新しいセッションを作成
    const sessionToken = this.generateSessionToken();
    const expires = new Date();
    expires.setDate(expires.getDate() + 30); // 30日間有効

    const session = await this.prisma.session.create({
      data: {
        userId,
        sessionToken,
        expires,
      },
      include: {
        user: true,
      },
    });

    return session;
  }

  async validateSession(sessionToken: string): Promise<SessionWithUser | null> {
    const session = await this.prisma.session.findUnique({
      where: { sessionToken },
      include: { user: true },
    });

    if (!session || session.expires < new Date()) {
      if (session) {
        await this.deleteSession(sessionToken);
      }
      return null;
    }

    return session;
  }

  async deleteSession(sessionToken: string): Promise<boolean> {
    try {
      await this.prisma.session.delete({
        where: { sessionToken },
      });
      return true;
    } catch {
      return false;
    }
  }

  async deleteAllUserSessions(userId: string): Promise<void> {
    await this.prisma.session.deleteMany({
      where: { userId },
    });
  }

  private generateSessionToken(): string {
    return randomBytes(32).toString('hex');
  }
}

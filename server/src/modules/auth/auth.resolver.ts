import {
  Resolver,
  Query,
  Mutation,
  Context,
  Field,
  ObjectType,
} from '@nestjs/graphql';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { PrismaService } from '@/prisma/prisma.service';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  image?: string;
}

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => Boolean)
  async logout(
    @Context() context: { req: Request; res: Response },
  ): Promise<boolean> {
    const { req, res } = context;
    const sessionToken = req.cookies?.session as string;

    if (sessionToken) {
      await this.authService.deleteSession(sessionToken);
    }

    res.clearCookie('session', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return true;
  }

  @Query(() => User, { nullable: true })
  async getMe(@Context() context: { req: Request }): Promise<User | null> {
    const sessionToken = context.req.cookies?.session as string;

    if (!sessionToken) {
      return null;
    }

    const session = await this.authService.validateSession(sessionToken);

    if (!session?.user) {
      return null;
    }

    const user = await this.prisma.user.findUnique({
      where: { id: session.userId },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name || undefined,
      image: user.image || undefined,
    };
  }
}

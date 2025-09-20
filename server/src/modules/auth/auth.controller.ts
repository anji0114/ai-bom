import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleUser } from './strategies/google.strategy';

interface RequestWithUser extends Request {
  user: GoogleUser;
}

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(): Promise<void> {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(
    @Req() req: RequestWithUser,
    @Res() res: Response,
  ): Promise<void> {
    try {
      // GoogleStrategyからのユーザー情報を取得
      const googleUser = req.user;

      // ユーザー検証・作成
      const user = await this.authService.validateGoogleUser(googleUser);

      // セッション作成
      const session = await this.authService.createSession(user.id);

      // HTTP-only cookieを設定
      res.cookie('session', session.sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30日
      });

      // フロントエンドにリダイレクト
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      res.redirect(`${frontendUrl}/dashboard`);
    } catch (error) {
      console.error('Authentication error:', error);
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      res.redirect(`${frontendUrl}/login?error=authentication_failed`);
    }
  }
}

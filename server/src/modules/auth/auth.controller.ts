import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';

type LoginRequest = {
  username: string;
  password: string;
};

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginRequest: LoginRequest,
    @Res() res: Response,
  ): Promise<void> {
    const { username, password } = loginRequest;

    try {
      const { accessToken, refreshToken, idToken } =
        await this.authService.login(username, password);

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000, // 60分
      });

      res.cookie('idToken', idToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000, // 60分
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30日
      });

      const user = await this.authService.getUsernameFromIdToken(idToken);

      const response = { success: true, user };
      res.json(response);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Authentication failed';
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response): Promise<void> {
    const refreshToken = req.cookies['refreshToken'] as string | null;
    const idToken = req.cookies['idToken'] as string | null;

    if (!refreshToken || !idToken) {
      throw new HttpException(
        'Refresh token not found',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const username = await this.authService.getUsernameFromIdToken(idToken);

    try {
      const { accessToken, idToken } = await this.authService.refreshToken(
        refreshToken,
        username.username,
      );

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000, // 60分
      });

      res.cookie('idToken', idToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000, // 60分
      });

      const response = { success: true, user: username };
      res.json(response);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Token refresh failed';
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }
}

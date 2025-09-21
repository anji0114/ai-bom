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

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
}

interface RefreshRequest {
  username: string;
}

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginRequest: LoginRequest,
    @Res() res: Response,
  ): Promise<void> {
    const { username, password } = loginRequest;

    try {
      const { accessToken, refreshToken } = await this.authService.login(
        username,
        password,
      );

      res.cookie('accessToken', accessToken, {
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

      const response: LoginResponse = { success: true };
      res.json(response);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Authentication failed';
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('refresh')
  async refresh(
    @Body() refreshRequest: RefreshRequest,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const { username } = refreshRequest;
    const refreshToken = req.cookies['refreshToken'] as string | null;

    if (!refreshToken) {
      throw new HttpException(
        'Refresh token not found',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const { accessToken } = await this.authService.refreshToken(
        refreshToken,
        username,
      );

      res.cookie('access-token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000, // 60分
      });

      const response: LoginResponse = { success: true };
      res.json(response);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Token refresh failed';
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }
}

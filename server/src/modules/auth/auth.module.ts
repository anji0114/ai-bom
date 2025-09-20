import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthController } from './auth.controller';
import { SessionService } from './session.service';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [PassportModule, ConfigModule],
  providers: [AuthService, AuthResolver, SessionService, GoogleStrategy],
  controllers: [AuthController],
  exports: [AuthService, SessionService],
})
export class AuthModule {}

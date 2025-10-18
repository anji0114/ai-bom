import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CognitoConfigService } from './cognito-config.service';
import { UserResolver } from './user.resolver';
import { AuthGuard } from './auth.guard';
import { UserService } from './user.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    CognitoConfigService,
    UserResolver,
    AuthGuard,
    UserService,
  ],
  exports: [AuthService, CognitoConfigService, AuthGuard, UserService],
})
export class AuthModule {}

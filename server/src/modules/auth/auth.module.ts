import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CognitoConfigService } from './cognito-config.service';
import { UserResolver } from './user.resolver';
import { AuthGuard } from './auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, CognitoConfigService, UserResolver, AuthGuard],
  exports: [AuthService, CognitoConfigService, AuthGuard],
})
export class AuthModule {}

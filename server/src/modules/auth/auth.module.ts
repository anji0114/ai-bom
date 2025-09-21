import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CognitoConfigService } from './cognito-config.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, CognitoConfigService],
  exports: [AuthService, CognitoConfigService],
})
export class AuthModule {}

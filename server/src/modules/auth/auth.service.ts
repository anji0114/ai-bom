import { Injectable } from '@nestjs/common';
import {
  InitiateAuthCommand,
  AuthFlowType,
} from '@aws-sdk/client-cognito-identity-provider';
import { CognitoConfigService } from './cognito-config.service';

@Injectable()
export class AuthService {
  constructor(private readonly cognitoConfigService: CognitoConfigService) {}

  async login(
    username: string,
    password: string,
  ): Promise<{ idToken: string; accessToken: string; refreshToken: string }> {
    const params = {
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      ClientId: this.cognitoConfigService.clientId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: this.cognitoConfigService.calculateSecretHash(username),
      },
    };

    try {
      const command = new InitiateAuthCommand(params);
      const result = await this.cognitoConfigService
        .getCognitoClient()
        .send(command);

      if (
        result.AuthenticationResult?.IdToken &&
        result.AuthenticationResult?.RefreshToken &&
        result.AuthenticationResult?.AccessToken
      ) {
        return {
          idToken: result.AuthenticationResult.IdToken,
          accessToken: result.AuthenticationResult.AccessToken,
          refreshToken: result.AuthenticationResult.RefreshToken,
        };
      }

      throw new Error('Authentication failed: No tokens received');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Authentication failed: ${message}`);
    }
  }

  async refreshToken(
    refreshToken: string,
    username: string,
  ): Promise<{ accessToken: string; idToken: string }> {
    const params = {
      AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
      ClientId: this.cognitoConfigService.clientId,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
        SECRET_HASH: this.cognitoConfigService.calculateSecretHash(username),
      },
    };

    try {
      const command = new InitiateAuthCommand(params);
      const result = await this.cognitoConfigService
        .getCognitoClient()
        .send(command);

      if (
        result.AuthenticationResult?.AccessToken &&
        result.AuthenticationResult?.IdToken
      ) {
        return {
          accessToken: result.AuthenticationResult.AccessToken,
          idToken: result.AuthenticationResult.IdToken,
        };
      }

      throw new Error('Token refresh failed: No AccessToken received');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Token refresh failed: ${message}`);
    }
  }
}

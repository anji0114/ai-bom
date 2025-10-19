import { Injectable } from '@nestjs/common';
import {
  InitiateAuthCommand,
  AuthFlowType,
} from '@aws-sdk/client-cognito-identity-provider';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { CognitoConfigService } from './cognito-config.service';

@Injectable()
export class AuthService {
  private idTokenVerifier: CognitoJwtVerifier<any, any, any>;

  constructor(private readonly cognitoConfigService: CognitoConfigService) {
    this.idTokenVerifier = CognitoJwtVerifier.create({
      userPoolId: this.cognitoConfigService.userPoolId,
      tokenUse: 'id',
      clientId: this.cognitoConfigService.clientId,
    });
  }

  async verifyAccessToken(accessToken: string): Promise<boolean> {
    try {
      const accessTokenVerifier = CognitoJwtVerifier.create({
        userPoolId: this.cognitoConfigService.userPoolId,
        tokenUse: 'access',
        clientId: this.cognitoConfigService.clientId,
      });
      await accessTokenVerifier.verify(accessToken);
      return true;
    } catch {
      return false;
    }
  }

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

  /**
   * Decode JWT without verification
   * Useful when token is expired but we need to extract payload
   */
  private decodeIdTokenWithoutVerification(idToken: string): {
    username: string;
    sub: string;
  } {
    try {
      const parts = idToken.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid token format');
      }

      // Decode the payload (second part)
      const payload: unknown = JSON.parse(
        Buffer.from(parts[1], 'base64').toString('utf-8'),
      );

      if (typeof payload !== 'object' || payload === null) {
        throw new Error('Invalid token payload');
      }

      const payloadObj = payload as Record<string, unknown>;
      const username = payloadObj['cognito:username'] as string;
      const sub = payloadObj['sub'] as string;

      if (!username || !sub) {
        throw new Error('Missing username or sub in token payload');
      }

      return { username, sub };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to decode token: ${message}`);
    }
  }

  async getUserIdFromIdToken(
    idToken: string,
    options?: { skipVerification?: boolean },
  ): Promise<{
    username: string;
    sub: string;
  }> {
    // If skipVerification is true, decode without verifying (useful for expired tokens)
    if (options?.skipVerification) {
      return this.decodeIdTokenWithoutVerification(idToken);
    }

    try {
      const payload = await this.idTokenVerifier.verify(idToken);
      const username = payload['cognito:username'] as string;
      const sub = payload.sub;

      return { username, sub };
    } catch {
      throw new Error('Invalid ID token');
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

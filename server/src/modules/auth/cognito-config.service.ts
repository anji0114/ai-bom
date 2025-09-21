import { Injectable } from '@nestjs/common';
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
import { createHmac } from 'crypto';

@Injectable()
export class CognitoConfigService {
  private readonly cognitoClient: CognitoIdentityProviderClient;
  private readonly clientSecret: string;
  private readonly region: string;
  public readonly clientId: string;

  constructor() {
    this.region = process.env.COGNITO_REGION as string;
    this.clientId = process.env.COGNITO_CLIENT_ID as string;
    this.clientSecret = process.env.COGNITO_CLIENT_SECRET as string;

    if (!this.region || !this.clientId || !this.clientSecret) {
      throw new Error('Missing required Cognito environment variables');
    }

    this.cognitoClient = new CognitoIdentityProviderClient({
      region: this.region,
    });
  }

  getCognitoClient(): CognitoIdentityProviderClient {
    return this.cognitoClient;
  }

  calculateSecretHash(username: string): string {
    return createHmac('SHA256', this.clientSecret)
      .update(username + this.clientId)
      .digest('base64');
  }
}

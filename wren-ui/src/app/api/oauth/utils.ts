import { safeFetcher } from './safe.fetcher';

interface OAuth2Config {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  authorizationUrl: string;
  tokenUrl: string;
  scope?: string;
}

export type UserInfoFromOAuth2 = {
  id: string;
  email: string;
  name?: string;
  picture?: string;
};

type tokenResponse = {
  access_token: string;
};

interface OAuth2Service {
  getAuthorizationUrl(): Promise<string>;
  getAccessToken(code: string);
  getUserInfo(accessToken: string);
}

export class OAuth2 implements OAuth2Service {
  private readonly config: OAuth2Config;

  constructor(config: OAuth2Config) {
    this.config = config;
  }
  getUserInfo(code: string) {
    // This method should be implemented by subclasses
    throw new Error('getUserInfo method not implemented');
  }

  async getAuthorizationUrl(): Promise<string> {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: 'code',
      scope: this.config.scope ?? 'openid profile email',
      state: Math.random().toString(36).substring(2, 15),
    });
    return `${this.config.authorizationUrl}?${params.toString()}`;
  }

  async getAccessToken(code: string) {
    const data = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      code,
      redirect_uri: this.config.redirectUri,
    }).toString();

    return safeFetcher(this.config.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data,
    });
  }
}

type GoogleOAuth2UserInfoResponse = {
  sub: string;
  email: string;
  name: string;
  picture: string;
  given_name?: string;
  family_name?: string;
  link?: string;
};
export class GoogleOAuth2Service extends OAuth2 {
  constructor(clientId: string, clientSecret: string, redirectUri: string) {
    super({
      clientId,
      clientSecret,
      redirectUri,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
      tokenUrl: 'https://oauth2.googleapis.com/token',
      scope: 'openid profile email',
    });
  }

  async getUserInfo(code: string) {
    const accessTokenResponse = await this.getAccessToken(code);

    const info = await safeFetcher(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${accessTokenResponse.access_token}`,
        },
      },
    );

    return {
        id: info.sub,
        email: info.email,
        name: info.name,
        picture: info.picture,
    }
  }
}
type AUVPOAuth2UserInfoResponse = {
  sub: string;
  email: string;
  full_name: string;
  profile_image: string;
};

export class AuvpOAuth2Service extends OAuth2 {
  constructor(clientId: string, clientSecret: string, redirectUri: string) {
    super({
      clientId,
      clientSecret,
      redirectUri,
      authorizationUrl: 'https://sso.homolog.auvp.com.br/oidc/auth',
      tokenUrl: 'https://sso.homolog.auvp.com.br/oidc/token',
      scope: 'openid profile email',
    });
  }
  async getUserInfo(code: string) {
    const accessTokenResponse = await this.getAccessToken(code);

    const info = await safeFetcher(
      'https://sso.homolog.auvp.com.br/oidc/me',
      {
        headers: {
          Authorization: `Bearer ${accessTokenResponse.access_token}`,
        },
      },
    );

    if (!info) {
      throw new Error('No user info returned');
    }

    return {
        id: info.sub,
        email: info.email,
        name: info.full_name,
        picture: info.profile_image,
      }
  }
}
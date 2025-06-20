import { createSession } from '@/lib/auth';
import { AuvpOAuth2Service, OAuth2 } from './utils';
import { UserRepository } from '../repository/user.repository';

export async function getOAuth2Service(provider: string | null) {
    let oAuth2Service: OAuth2 | null = null;

    switch (provider) {
      // case 'google':
      //   oAuth2Service = new GoogleOAuth2Service(
      //     process.env.GOOGLE_CLIENT_ID ?? '',
      //     process.env.GOOGLE_CLIENT_SECRET ?? '',
      //     `${process.env.API_URL}/auth/v1/oauth/callback?provider=google`,
      //   );
      //   break;
      case 'auvp':
        oAuth2Service = new AuvpOAuth2Service(
          process.env.SSO_AUVP_CLIENT_ID ?? '',
          process.env.SSO_AUVP_CLIENT_SECRET ?? '',
          `https://cashmind.asupernova.com.br/api/auth/callback?provider=auvp`,
        );
        break;
    }

    if (!oAuth2Service) {
      throw new Error('Unsupported OAuth2 provider');
    }

    return oAuth2Service;
}

export async function handleOAuth2Callback(
    code: string,
    provider: string,
  ) {
    const oAuth2Service = await getOAuth2Service(provider);

    const userInfo = await oAuth2Service.getUserInfo(code);

    const userRepository = new UserRepository();

    // @ts-ignore
    const user = await userRepository.findOrCreateUser(userInfo.id, userInfo.email);

    const token = await createSession(user.id, user.email);

    return token;
}
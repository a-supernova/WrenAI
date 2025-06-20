import { createSession } from '@/lib/auth';
import { AuvpOAuth2Service, OAuth2 } from './utils';

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
          'ddcb856d-e4de-4ed1-94d4-b5f925a4224e',
          'a419bb1c-de8b-4ddc-a62c-dd268390924a',
          `https://cashmind.asupernova.com.br/api/oauth_callback?provider=auvp`,
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

    // const user = await this.userService.findOrCreateUser({
    //   name: userInfo.name,
    //   email: userInfo.email,
    //   picture: userInfo.picture,
    // });

    // if (!user.active) {
    //   throw new Error('User account is not active');
    // }

    const token = await createSession(1, 'marcelo.fleury@asupernova.com.br');

    return token;
}
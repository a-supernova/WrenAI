import { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';
import { getOAuth2Service } from './oauth.service';

export async function GET(req: NextRequest) {
  const provider = req?.nextUrl?.searchParams.get("provider")

  const oauth2Service = await getOAuth2Service(provider);

  redirect(await oauth2Service.getAuthorizationUrl());

}
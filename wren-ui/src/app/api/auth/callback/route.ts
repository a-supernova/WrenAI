import { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';
import { handleOAuth2Callback } from '../oauth.service';

export async function GET(req: NextRequest) {
  const code = req?.nextUrl?.searchParams.get("code")
  const provider = req?.nextUrl?.searchParams.get("provider")
  const token = await handleOAuth2Callback(code ?? '', provider ?? '');
  redirect("https://cashmind.asupernova.com.br/home/dashboard");
}
import { createSession } from '../../../lib/auth';

const users = [
  { email: 'cashmind@asupernova.com.br', password: process.env.PASSWORD_SECRET }
];

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = users.find((user) => user.email === email);
  if (!user) {
    return Response.json({ message: 'User not found' }, { status: 401 });
  }

  if (user.password != password) {
    return Response.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const token = await createSession(user.email);
  return Response.json({ token });
}
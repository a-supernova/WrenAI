import { createSession } from '../../../lib/auth';
import { cookies } from "next/headers";

const users = [
  { email: 'cashmind@auvp.com.br', password: process.env.PASSWORD_SECRET }
];

export async function POST(req: Request) {
  //const { cookies } = require('next/headers');
  const { email, password } = await req.json();
  // Find user by email
  const user = users.find((user) => user.email === email);
  if (!user) {
    return Response.json({ message: 'User not found' }, { status: 401 });
  }
  // Compare password
  if (user.password != password) {
    return Response.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  // Create a JWT token
  //const token = jwt.sign({ email: user.email }, process.env.SESSION_SECRET, { expiresIn: '7d' });
  const token = await createSession(user.email);
  //const token = {token: 123};
  const cookiesStore = cookies();

  cookiesStore.set("session", token);
  return Response.json({ token });
}
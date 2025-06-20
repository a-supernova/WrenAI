import { createSession } from '../../../lib/auth';
import { UserRepository } from '../repository/user.repository';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return Response.json({ message: 'Email and password are required' }, { status: 400 });
  }

  const userRepository = new UserRepository();
  const user = await userRepository.findByEmailPassword(email, password);
  if (!user) {
    return Response.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const token = await createSession(user.id, user.email);
  return Response.json({ token });
}
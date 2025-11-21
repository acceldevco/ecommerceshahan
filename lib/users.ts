// lib/users.ts
import bcrypt from "bcryptjs";

interface User {
  username: string;
  passwordHash: string;
}

export const users = new Map<string, User>();

export async function createUser(username: string, password: string) {
  const passwordHash = await bcrypt.hash(password, 10);
  users.set(username, { username, passwordHash });
}

export async function verifyUser(username: string, password: string) {
  const user = users.get(username);
  if (!user) return false;
  const isValid = await bcrypt.compare(password, user.passwordHash);
  return isValid ? user : false;
}

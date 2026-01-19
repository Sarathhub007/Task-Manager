import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  email: string;
}

const SECRET = process.env.JWT_SECRET!;

export function createToken(payload: TokenPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, SECRET) as TokenPayload;
}

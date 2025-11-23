import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";

export function signToken(payload: object, expiresIn:any = "1h") {

  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token: string) {
  try {
    console.log(JWT_SECRET);
    
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

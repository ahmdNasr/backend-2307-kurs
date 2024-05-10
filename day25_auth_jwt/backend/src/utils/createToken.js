import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

export function createToken(user, tokenType = "access") {
  const issuedAtSeconds = Math.ceil(Date.now() / 1000);
  const tokenPayload = {
    sub: user._id,
    type: tokenType,
    iat: issuedAtSeconds,
    // exp: issuedAtSeconds + 1 * 60 * 60 // 1h (manuell)
  };
  const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn: "1h" });
  return token;
}

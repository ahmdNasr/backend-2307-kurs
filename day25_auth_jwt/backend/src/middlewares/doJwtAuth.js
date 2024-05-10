import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

export async function doJwtAuth(req, res, next) {
  const _invalidAuth = (message) =>
    res.status(401).json({ message: message || "Invalid auth" }); // 401 Status Unauthorized!

  if (!req.headers.authorization) return _invalidAuth();

  // req.headers.authorization ====> "Bearer eyJhbGciOiJIUzI1Ni..."
  const [authType, tokenString] = req.headers.authorization.split(" ");
  if (authType !== "Bearer" || !tokenString) return _invalidAuth();

  try {
    const verifiedClaims = jwt.verify(tokenString, jwtSecret); // Claims sind Behauptungen der TokenPayload
    req.authenticatedUserId = verifiedClaims.sub; // verifiedClaims = TokenPayload = { sub, type, iat, exp }
    next();
  } catch (err) {
    console.log(err);
    return _invalidAuth();
  }
}

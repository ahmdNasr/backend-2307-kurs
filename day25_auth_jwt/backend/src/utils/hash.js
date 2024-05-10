import crypto from "crypto";

export function hash(inputString) {
  return crypto.createHash("sha512").update(inputString).digest("hex");
}

export function generateRandomSalt() {
  return crypto.randomBytes(64).toString("hex");
}

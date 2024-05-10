// middleware function hat req, res, next!
// prüft die auth informationen in req.headers.authorization UND setzt den authorized user in die req (für den controller.)
// dann next() aufrufen

import { User } from "../models/User.js";
import { hash } from "../utils/hash.js";

// (bei fehler, antworten mit "Unauthorized")
export async function doBasicAuth(req, res, next) {
  const _invalidAuth = (message) =>
    res.status(401).json({ message: message || "Invalid auth" }); // 401 Status Unauthorized!

  // req.headers.authorization -->  'Basic YWhtZWRAc3VwZXItY29kZS5kZTpoYWxsbzEyMw=='
  if (!req.headers.authorization) return _invalidAuth("No authorization");

  // ["Basic", "YWhtZWRAc3VwZXItY29kZS5kZTpoYWxsbzEyMw=="]
  const [authType, authInfoBase64] = req.headers.authorization.split(" ");

  if (authType !== "Basic") return _invalidAuth();
  if (!authInfoBase64) return _invalidAuth();

  // authInfo = "ahmed@super-code.de:hallo123"
  const authInfoClearText = Buffer.from(authInfoBase64, "base64").toString(
    "utf-8"
  );
  const [email, password] = authInfoClearText.split(":");
  if (!email || !password) return _invalidAuth();

  // login process:
  const user = await User.findOne({ email });
  if (!user) return _invalidAuth("Incorrect Email"); // falsche email!

  //   if (user.failedLoginTries >= 3)
  //     return res.json({ message: "Dein account ist gesperrt" });

  const passwordHash = hash(`${password}${user.passwordSalt}`);
  const correctPassword = passwordHash === user.passwordHash;
  if (!correctPassword) {
    // await User.updateOne({ failedLoginTries: user.failedLoginTries + 1 });
    return _invalidAuth("Incorrect Password"); // korrekte email, aber falsches passwort!
  }

  //   await User.updateOne({ failedLoginTries: 0 }); // reset failedLoginTries

  req.authenticatedUser = user; // user ZWISCHENSPEICHERN für die Weiterverabeitung durch die Controller!

  next(); // valid auth, go to controller....!
}

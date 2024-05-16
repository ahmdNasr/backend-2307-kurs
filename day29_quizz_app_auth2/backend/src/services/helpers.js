export function userToView(user) {
  // _id, firstname, lastname, email, bio, passwordHash, passwordSalt, sixDigitCode, isEmailVerified
  return {
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    bio: user.bio,
  };
}

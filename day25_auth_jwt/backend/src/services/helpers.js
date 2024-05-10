export function userToView(user) {
  return {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    bio: user.bio,
  };
}

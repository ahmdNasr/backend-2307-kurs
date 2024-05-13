export function userToView(user) {
  return {
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    bio: user.bio,
  };
}

export const userToView = (user)=> {
    return {
        _id: user._id,
        firstname: user.firstname, 
        lastname: user.lastname, 
        email: user.email, 
        isVerified: user.isVerified, 
        isAdmin: user.isAdmin,
        imageUrl: user.imageUrl
    }
}
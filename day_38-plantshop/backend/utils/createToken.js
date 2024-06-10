import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET

export const createToken = (user)=> {

    const payload ={
        sub: user._id, 
        isAdmin: user.isAdmin
    }
    const token = jwt.sign(payload, jwtSecret, {expiresIn: "1w"})
    return token
}
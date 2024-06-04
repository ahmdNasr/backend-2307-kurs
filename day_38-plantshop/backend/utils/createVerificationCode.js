import crypto from "crypto";


export const createVerificationCode = ( ) => {
    return crypto.randomInt(100000, 999999) 
}

import mongoose from "mongoose"

const userSchema = new mongoose.Schema(

    {
        vorname: { type: String, required: true},
        nachname: { type: String},
        email: { type: String, required: true},
        password: { type: String, required: true},
        verificationCode: { type: String},
        isAdmin: { type: Boolean, default: false, required: true},
        isVerified: { type: Boolean, default: false, required: true}
    },
    { collection: "users", timestamps: true}
)

export const User = mongoose.model("User", userSchema)
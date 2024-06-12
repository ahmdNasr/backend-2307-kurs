import mongoose from "mongoose"

const userSchema = new mongoose.Schema(

    {
        firstname: { type: String, required: true},
        lastname: { type: String},
        email: { type: String, required: true},
        password: { type: String, required: true},
        verificationCode: { type: String},
        isAdmin: { type: Boolean, default: false, required: true},
        isVerified: { type: Boolean, default: false, required: true},
        // orders: [{type: mongoose.Schema.Types.UUID, ref: "Order" }]
    },
    { collection: "users", timestamps: true}
)

export const User = mongoose.model("User", userSchema)
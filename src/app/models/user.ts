import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false
    },
    fullname: {
        type: String,
        required: [true, 'Full is required'],
        minLength: [3, "Fullname must be at leates 3 characteres"],
        maxLength: [50, "Fullname must be most 50 characteres"]
    }
})

const User = models.User || model('User', userSchema)
export default User;
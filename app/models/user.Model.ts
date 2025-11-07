import { model, Schema } from "mongoose";
import { userInertface } from "../interface/user.interface";
import Joi from 'joi'

//validation schema
export const UserSchemaValidate = Joi.object({
    name: Joi.string().required().min(3),
    email: Joi.string().required().email(),
    phone: Joi.number().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),

})

export const LoginSchemaValidate = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const UserSchema = new Schema<userInertface>({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        enum:['user','auther'],
        default:'user'
    }

})

const UserModel = model<userInertface>('user', UserSchema)

export { UserModel }
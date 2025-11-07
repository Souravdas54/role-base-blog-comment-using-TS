import { model, Schema } from "mongoose";
import { blogInertface } from "../interface/blog.interface";
import Joi from 'joi'

//validation Blog schema
export const BlogSchemaValidate = Joi.object({
    createdBy: Joi.string().optional(),
    blogname: Joi.string().required().min(2),
    description: Joi.string().required(),
    image: Joi.string().required(),

})

export const BlogSchema = new Schema<blogInertface>({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: false
    },
    blogname: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

const blogModel = model<blogInertface>('blog', BlogSchema)
export { blogModel }
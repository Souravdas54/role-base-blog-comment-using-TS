import { Schema, model } from 'mongoose';
import { CommentInterface } from '../interface/comments';

const CommentSchema = new Schema<CommentInterface>({
    blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },

    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    text: { type: String, required: true },

}, { timestamps: true });

const commentModel = model<CommentInterface>('Comment', CommentSchema);
export { commentModel }
import mongoose from "mongoose";

export interface CommentInterface  {
  blog: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  text: string;
}
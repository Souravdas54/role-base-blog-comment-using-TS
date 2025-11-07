import {commentModel} from "../models/comments";
import { CommentInterface } from "../interface/comments";
import mongoose from "mongoose";

class CommentRepository {
  // Create new comment
  async createComment(data: CommentInterface) {
    try {

       if (!mongoose.Types.ObjectId.isValid(data.blog) || !mongoose.Types.ObjectId.isValid(data.user)) {
        throw new Error("Invalid blog or user ID");
      }

       const comment = await commentModel.create({
        blog: data.blog,
        user: data.user,
        text: data.text,
      });

      // const comment = await commentModel.create();
      return comment;
    } catch (error) {
      console.error("Error creating comment:", error);
      throw new Error("Failed to create comment");
    }
  }

  // Get all comments
  async getCommentsByBlog(blogId: string) {
    try {

        if (!mongoose.Types.ObjectId.isValid(blogId)) {
        throw new Error("Invalid blog ID");
      }

      const comments = await commentModel.find({ blog: blogId })

      return comments;
      
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw new Error("Failed to get comments");
    }
  }

}

export const commentRepository = new CommentRepository();

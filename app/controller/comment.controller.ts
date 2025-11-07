import { Request, Response } from "express";
import { commentRepository } from "../repositories/comment.repo";
import { blogModel } from "../models/blog.Model";
import { CommentInterface } from "../interface/comments";
import _ from "lodash";
import mongoose from "mongoose";

class CommentController {

  async createComment(req: Request, res: Response): Promise<any> {
    try {
      const user = (req as any).user; // from JWT middleware
      if (!user) {
        return res.status(401).json({ message: "Unauthorized user" });
      }

      const { blogId, text } = req.body;

      const comment = await commentRepository.createComment({
        blog: blogId,
        user: user.userID,
        text,
      });

      return res.status(201).json({
        message: "Comment added successfully",
        data: comment,
      });

    } catch (error) {
      console.error("Error creating comment:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async getComments(req: Request, res: Response): Promise<any> {
    try {
      
        const author = (req as any).user;

      if (!author || author.role !== "author") {
        return res.status(403).json({ message: "Access denied — Only author can view comments" });
      }

      const { blogId } = req.params;
      const comments = await commentRepository.getCommentsByBlog(blogId);

      if (!comments || comments.length === 0) {
        return res.status(404).json({ message: "No comments found" });
      }

      return res.status(200).json({
        message: "Comments fetched successfully",
        data: comments,
      });
    } catch (error) {
      console.error("Error fetching comments:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

}

export const commentController = new CommentController();

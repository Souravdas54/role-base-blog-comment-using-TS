import express from "express";
import { commentController } from "../controller/comment.controller";
import { protect, authorizeRole } from "../middleware/auth.middleaware";

const commentRouter = express.Router();

commentRouter.post("/comment", protect, commentController.createComment);

commentRouter.get("/comments/:blogId", protect, commentController.getComments);

export { commentRouter };

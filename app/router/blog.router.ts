import express from 'express';
import { blogController } from '../controller/blog.controller';
import { protect,authorizeRole } from '../middleware/auth.middleaware';
import upload from '../interface/image.interface';

const blogRouter = express.Router()

blogRouter.post('/create/blog',protect,authorizeRole(['author']) ,upload.single('image'),blogController.create_blog)
blogRouter.get('/get/blog',blogController.get_all_blogs)
export {blogRouter}
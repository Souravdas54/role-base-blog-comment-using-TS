import { Request, Response } from "express";
import { BlogSchemaValidate } from "../models/blog.Model";
import { userRepositories } from "../repositories/user.repo";
import _ from 'lodash'
// import { blogModel } from "../models/blog.Model";
import { AuthRequest } from "../middleware/auth.middleaware";
import { blogRepositories } from "../repositories/blog.repo";


class BlogController {

    async create_blog(req: AuthRequest, res: Response): Promise<any> {
        try {
            if (req.user?.role !== "author") {
      return res.status(403).json({ message: "Only authors can create blogs" });
    }
    
            const createData = {
                createdBy: req.user?.userId,
                blogname: req.body.blogname,
                description: req.body.description,
                image: req.file?.path,
            }

            const { error, value } = BlogSchemaValidate.validate(createData)
            if (error) {
                return res.status(400).send(error.message);
            }

            const createblogdata = await blogRepositories.save(value)
            if (_.isObject(createblogdata) && createblogdata._id) {

                return res.status(200).send({
                    message: "Blog Create successful",
                    data: createblogdata,
                });
            } else {
                return res.status(400).send({
                    message: "Failed to new blog user",
                });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "Internal Server Error",
            });
        }
    }

    async get_all_blogs(req: AuthRequest, res: Response): Promise<any> {
        try {
            const blogs = await blogRepositories.findAll();
            return res.status(200).json({
                success: true,
                message: "Blog list fetched successfully",
                total:blogs.length,
                data: blogs,
            });
        } catch (error) {
            console.error("Get Blog Error:", error);
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }


}
export const blogController = new BlogController(); 
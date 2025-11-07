import { blogInertface } from "../interface/blog.interface";
import { blogModel } from "../models/blog.Model";

class BlogRepositories {

    async save(data: blogInertface) {
        try {
            const blogData = new blogModel(data);
            const newBlogData = await blogData.save();
            return newBlogData;
            
        } catch (error:any) {
            console.log(error.message)
        }
    }

    async findAll(): Promise<blogInertface[]> {
        return await blogModel.find().populate("createdBy", "name email role");
    }
};

const blogRepositories = new BlogRepositories()
export { blogRepositories }
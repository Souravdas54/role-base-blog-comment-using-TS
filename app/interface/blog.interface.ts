import { Types } from "mongoose";

export interface blogInertface {
    createdBy:Types.ObjectId,
    blogname: string,
    description: string,
    image: string,

}
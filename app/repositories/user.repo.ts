import { UserModel } from "../models/user.Model";
import { userInertface } from '../interface/user.interface';

class UserRepositories {
    //create a post
    async save(data: userInertface) {
        try {
            const newStudent = await UserModel.create(data)
            return newStudent

        } catch (error) {
            console.log(error)
        }
    }

    async findByEmail(email: string) {
        try {
            const findEmailId = await UserModel.findOne({ email });
            return findEmailId;

        } catch (error) {
            console.log(error)
        }
    }
    //all data
    async find() {
        try {
            const studentList = await UserModel.find()
            return studentList
        } catch (error) {
            console.log(error)
        }
    }
    //single data
    async singleData(id: string) {
        try {
            const sdata = await UserModel.findById({ _id: id })
            if (!sdata) {
                return 'student not available'
            }
            return sdata
        } catch (error) {
            console.log(error);
        }
    }

    //update a post
    async updatePost(id: string, data: userInertface) {
        try {
            //pass the id of the object you want to update
            //data is for the new body you are updating the old one with
            //new:true, so the dats being returned, is the update one
            const student = await UserModel.findByIdAndUpdate({ _id: id }, data, { new: true })
            if (!student) {
                return "student not available"
            }
            return student
        } catch (error) {
            console.log(error)
        }
    }

    //delete a post by using the find by id and delete 
    async deletePost(id: string) {
        try {
            const student = await UserModel.findByIdAndDelete(id)
            if (!student) {
                return 'student not available'
            }
        } catch (error) {
            console.log(error)
        }
    }


}

const userRepositories = new UserRepositories()

export { userRepositories }


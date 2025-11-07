import { Request, Response } from 'express';
import { UserSchemaValidate } from '../models/user.Model';
import { userRepositories } from '../repositories/user.repo';
import {LoginSchemaValidate }from '../models/user.Model';
import _ from 'lodash'
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";


class UserController {

    async register(req: Request, res: Response): Promise<any> {
    try {
      const data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        role: req.body.role || "user",
      };

      const { error, value } = UserSchemaValidate.validate(data);
      if (error) {
        return res.status(400).send(error.message);
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(value.password, salt);

      const userData = {
        ...value,
        password: hashedPassword,
      };

      const studentdata = await userRepositories.save(userData);

      if (_.isObject(studentdata) && studentdata._id) {
        return res.status(200).send({
          message: "Registration successful",
          data: studentdata,
        });
      } else {
        return res.status(400).send({
          message: "Failed to register new user",
        });
      }
      
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Internal Server Error",
      });
    }
  }

  async login(req: Request, res: Response): Promise<any> {
    try {
      const data = {
        email: req.body.email,
        password: req.body.password,
      };

      const { error, value } = LoginSchemaValidate.validate(data);
      if (error) {
        return res.status(400).send(error.message);
      }

      const userData = await userRepositories.findByEmail(value.email);
      if (!userData) {
        return res.status(404).send({
          message: "User not found",
        });
      }

      const isPasswordMatch = await bcrypt.compare(value.password, userData.password);
      if (!isPasswordMatch) {
        return res.status(401).send({
          message: "Invalid password",
        });
      }

       const payload = {
        userID: userData._id,
        email: userData.email,
        role: userData.role,
      };

       const secretKey = process.env.JWT_SECRET as string;

     const userToken =
        userData.role === "user"
          ? jwt.sign(payload, secretKey, { expiresIn: "1d" })
          : null;

      const authorToken =
        userData.role === "author"
          ? jwt.sign(payload, secretKey, { expiresIn: "1d" })
          : null;

      return res.status(200).send({
        message: "Login successful",
        role: userData.role,
        token: userData.role === "author" ? authorToken : userToken,
        data: _.omit(userData.toObject(), ["password"]),
      });

    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Internal Server Error",
      });
    }
  }


  async getUser(req: Request, res: Response):Promise<any> {
    try {
      const studentdata = await userRepositories.find()

   // const student = _.sortBy(studentdata, ['name'])
      if (_.isObject(studentdata)) {
        return res.status(200).send({
          message: "data get successfully",
          data: studentdata,
        });
      } else {
        return res.status(400).send({
          message: "Failed to registration new user",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}






export const userController = new UserController();
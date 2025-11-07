import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectDb } from './app/config/dbConnect';
import {router} from './app/router/user.router';
import { blogRouter } from './app/router/blog.router';
import { commentRouter } from './app/router/comment.router';

const app = express();
const PORT = process.env.PORT || 8500;

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(router)
app.use(blogRouter)
app.use(commentRouter)

connectDb.then(() => {
    app.listen(process.env.PORT, () => console.log(`Server is listening on port http://localhost:${process.env.PORT}`))
});

import express from 'express';
import { userController } from '../controller/user.controller';
import { protect } from '../middleware/auth.middleaware';

const router = express.Router()


router.post('/register/user', userController.register)
router.post('/login/user', userController.login)

router.get('/get/user', protect, userController.getUser)




export { router }
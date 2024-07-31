import { test } from '@/controllers';
import express from 'express';
const userRouter = express.Router();

userRouter.get("/test", test)

export default userRouter;
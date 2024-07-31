
import { login, register } from '@/controllers';
import express from 'express';
const authRouter = express.Router();

authRouter.post("/registration", register)
authRouter.post("/login", login)

export default authRouter;
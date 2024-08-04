
import { deleteAccount, googleLogin, login, register, userUpdate } from '@/controllers';
import express from 'express';
const authRouter = express.Router();

authRouter.post("/registration", register)
authRouter.post("/login", login)
authRouter.post("/google", googleLogin)
authRouter.put("/update", userUpdate)
authRouter.delete("/delete", deleteAccount)

export default authRouter;

import User from '@/models/users.model';
import { UserSignUpSchema } from '@/schemas/user.schemas';
import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';


const register = async (req: Request, res: Response, next: NextFunction) => {
    const parseData = await UserSignUpSchema.safeParse(req.body);

    if (!parseData.success) {
        return res.status(400).json({ errors: parseData.error.errors });
    }

    // check user exists
    const user = await User.findOne({ email: parseData.data.email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }

    // create a user
    const { email, password, name } = parseData.data;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ email, name, password: hashPassword });
    try {
        await newUser.save();
        const accessToken = jwt.sign(
            { userId: newUser._id, email: newUser.email, name: newUser.name, role: newUser.role },
            process.env.JWT_SECRET ?? 'Secret_Key',
            { expiresIn: '2h' }
        );
        return res.status(201).json({ message: "Successfully user created", accessToken, user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role, avatar: newUser.avatar } });
    } catch (error) {
        next(error);
    }
}

export default register;
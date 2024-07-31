
import User from '@/models/users.model';
import { UserSignUpSchema } from '@/schemas/user.schemas';
import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';

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
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default register;
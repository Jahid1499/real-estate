
import User from '@/models/users.model';
import { UserLoginSchema } from '@/schemas/user.schemas';
import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const login = async (req: Request, res: Response, next: NextFunction) => {
    const parseData = await UserLoginSchema.safeParse(req.body);

    if (!parseData.success) {
        return res.status(400).json({ errors: parseData.error.errors });
    }

    const { email, password } = parseData.data;

    // check user exists email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }


    // compare password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials!" });
    }

    const accessToken = jwt.sign(
        { userId: user._id, email: user.email, name: user.name, role: user.role },
        process.env.JWT_SECRET ?? 'Secret_Key',
        { expiresIn: '2h' }
    );

    return res.status(200).json({ message: "Successfully login", accessToken, user: { userId: user._id, email: user.email, name: user.name, role: user.role, avatar: user.avatar } });
}

export default login;
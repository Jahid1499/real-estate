import User from '@/models/users.model';
import { UserGoogleLoginSchema } from '@/schemas/user.schemas';
import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const googleLogin = async (req: Request, res: Response, next: NextFunction) => {

    const parseData = await UserGoogleLoginSchema.safeParse(req.body);

    if (!parseData.success) {
        return res.status(400).json({ errors: parseData.error.errors });
    }

    try {
        // check user exists
        const user = await User.findOne({ email: parseData.data.email });
        if (user) {
            const accessToken = jwt.sign(
                { id: user._id, email: user.email, name: user.name, role: user.role },
                process.env.JWT_SECRET ?? 'Secret_Key',
                { expiresIn: '2h' }
            );
            return res.status(200).json({ message: "Successfully login", accessToken, user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar } });
        } else {
            const { email, name, avatar } = parseData.data;
            const salt = await bcrypt.genSalt(10);

            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashPassword = await bcrypt.hash(generatedPassword, salt);

            const newUser = new User({ email, name, password: hashPassword, avatar });
            await newUser.save();

            const accessToken = jwt.sign({ id: newUser._id, email: newUser.email, name: newUser.name, role: newUser.role },
                process.env.JWT_SECRET ?? 'Secret_Key', { expiresIn: '2h' });

            return res.status(201).json({ message: "Successfully user created", accessToken, user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role, avatar: newUser.avatar } });
        }
    } catch (error) {
        next(error)
    }


}

export default googleLogin;
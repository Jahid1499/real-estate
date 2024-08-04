
import User from '@/models/users.model';
import { UserUpdateSchema } from '@/schemas/user.schemas';
import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';

const userUpdate = async (req: Request, res: Response, next: NextFunction) => {
    const parseData = await UserUpdateSchema.safeParse(req.body);

    if (!parseData.success) {
        return res.status(400).json({ errors: parseData.error.errors });
    }

    let { name, avatar, password, email } = parseData.data;

    // check user exists email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }

    try {
        if (password) {
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
        } else {
            password = user.password as string
        }

        if (!name) {
            name = user.name as string
        }

        if (!avatar) {
            avatar = user.avatar as string
        }

        await User.findOneAndUpdate(user._id, { name, password, avatar })

        // return update response
        return res.status(201).json({ message: "Successfully user updated", user: { name, email, avatar } });

    } catch (error) {
        next(error);
    }




    return res.status(200).json({ message: "Successfully updated" });
}

export default userUpdate;
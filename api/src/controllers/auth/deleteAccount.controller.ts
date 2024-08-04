import User from '@/models/users.model';
import { DeleteAccountSchema } from '@/schemas/user.schemas';
import { NextFunction, Request, Response } from 'express';

const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {

    const parseData = await DeleteAccountSchema.safeParse(req.body);

    if (!parseData.success) {
        return res.status(400).json({ errors: parseData.error.errors });
    }

    try {
        // check user exists
        const user = await User.findOne({ email: parseData.data.email });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        await User.findByIdAndDelete(user._id);

        return res.status(200).json({ message: "User account successfully deleted" });
    } catch (error) {
        next(error)
    }

}

export default deleteAccount;
import Listing from '@/models/listing.model';
import { CreateListingSchema } from '@/schemas/listing.schemas';
import { NextFunction, Request, Response } from 'express';
const create = async (req: Request, res: Response, next: NextFunction) => {
    const parseData = await CreateListingSchema.safeParse(req.body);
    if (!parseData.success) {
        return res.status(400).json({ errors: parseData.error.errors });
    }
    const listing = await Listing.create(parseData.data);
    return res.status(201).json(listing)
}
export default create;
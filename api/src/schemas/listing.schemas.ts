import { z } from "zod";

export const CreateListingSchema = z.object({
    name: z.string().min(3).trim(),
    description: z.string().min(3).trim(),
    address: z.string().min(3).trim(),
    regularPrice: z.number(),
    discountPrice: z.number(),
    bathrooms: z.number(),
    bedrooms: z.number(),
    furnished: z.boolean(),
    parking: z.boolean(),
    type: z.string(),
    offer: z.boolean(),
    imageUrls: z.string().array(),
    userRef: z.string(),
})



import { z } from "zod";

export const UserSignUpSchema = z.object({
    name: z.string().min(3).max(20).trim(),
    email: z.string().max(30).optional(),
    password: z.string().min(3).max(255),
})

export const UserGoogleLoginSchema = z.object({
    name: z.string().min(3).max(30).trim(),
    email: z.string().max(30).optional(),
    avatar: z.string().min(3).max(255),
})

export const AccessTokenSchema = z.object({
    accessToken: z.string(),
});

export const UserLoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

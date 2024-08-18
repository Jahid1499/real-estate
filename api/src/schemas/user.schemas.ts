import { z } from "zod";

export const UserSignUpSchema = z.object({
    name: z.string().min(3).max(20).trim(),
    email: z.string().max(30).optional(),
    password: z.string().min(3).max(255),
})

export const UserUpdateSchema = z.object({
    name: z.string().min(3).max(20).trim().optional(),
    avatar: z.string().min(3).max(255).optional(),
    email: z.string().max(30).optional(),
    password: z.string().min(3).max(255).optional(),
})

export const UserGoogleLoginSchema = z.object({
    name: z.string().min(3).max(30).trim(),
    email: z.string().max(30).optional(),
    avatar: z.string().max(100).optional(),
})

export const AccessTokenSchema = z.object({
    accessToken: z.string(),
});

export const DeleteAccountSchema = z.object({
    email: z.string().max(30).optional(),
});

export const UserLoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

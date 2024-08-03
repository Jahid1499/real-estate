export type RootState = {
    auth: {
        accessToken: string;
        user: {
            userId: string,
            email: string,
            name: string,
            role: string,
            avatar: string,
        }
    };
}
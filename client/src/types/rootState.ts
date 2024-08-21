export type RootState = {
    auth: {
        accessToken: string;
        user: {
            id: string,
            email: string,
            name: string,
            role: string,
            avatar: string,
        }
    };
}
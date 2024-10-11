namespace IUser {
    interface User {
        id: number;
        username: string;
        email: string;
    }

    interface UserInfo extends User {
        roles: Role.Role[];
    }
}
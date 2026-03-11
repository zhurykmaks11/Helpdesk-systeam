import { User } from "../models/User";

const users: User[] = [];

export const getUsers = (): User[] => {
    return users;
};

export const createUser = (name: string, email: string): User => {

    const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role: "USER",
        createdAt: new Date()
    };

    users.push(newUser);

    return newUser;
};
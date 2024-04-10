interface UserRegisterInterface {
    name: string;
    email: string;
    password: string;
}

interface UserLoginInterface {
    id: number;
    name: string | null | undefined;
    email: string;
}

export type {
    UserRegisterInterface,
    UserLoginInterface
};

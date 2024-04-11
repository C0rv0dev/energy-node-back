interface UserRegisterInterface {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm?: string;
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

interface UserRegisterInterface {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm?: string;
}

interface UserLoginInterface {
    id: string;
    firstName: string;
    lastName: string | undefined | null;
    email: string;
    token: string;
}

export type {
    UserRegisterInterface,
    UserLoginInterface
};

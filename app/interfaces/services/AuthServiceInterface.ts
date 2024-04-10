interface AuthServiceInterface {
    login: (email: string, password: string) => void;
    logout: (req: Request, res: Response) => void;
    register: (name: string, email: string, password: string) => void;
};

export default AuthServiceInterface;

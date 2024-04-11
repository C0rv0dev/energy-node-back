import { UserRegisterInterface } from "../models/UserModelInterface";

interface AuthServiceInterface {
    login: (email: string, password: string) => void;
    logout: (req: Request, res: Response) => void;
    register: (user: UserRegisterInterface) => void;
};

export default AuthServiceInterface;

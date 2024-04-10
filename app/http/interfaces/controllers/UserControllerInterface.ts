interface UserControllerInterface {
    login: (req: Request, res: Response) => void;
    logout: (req: Request, res: Response) => void;
    register: (req: Request, res: Response) => void;
};

export default UserControllerInterface;

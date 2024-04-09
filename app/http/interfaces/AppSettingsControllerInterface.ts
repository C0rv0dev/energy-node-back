type AppSettingsControllerInterface = {
    fetchSettings: (req: Request, res: Response) => void;
    updateSettings: (req: Request, res: Response) => void;
};

export type { AppSettingsControllerInterface };

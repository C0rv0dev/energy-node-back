interface EnergyUseControllerInterface {
  fetchEnergyUse: (req: Request, res: Response) => void;
  createEnergyUse: (req: Request, res: Response) => void;
  updateEnergyUse: (req: Request, res: Response) => void;
  deleteEnergyUse: (req: Request, res: Response) => void;
};

export default EnergyUseControllerInterface;

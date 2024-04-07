import EnergyUse from "../../models/EnergyUse";

type EnergyUseControllerType = {
  getEnergyUsage: (req: Request, res: Response) => void;
  createEnergyUse: (req: Request, res: Response) => void;
  updateEnergyUse: (req: Request, res: Response) => void;
  deleteEnergyUse: (req: Request, res: Response) => void;
  getTotalEnergyUsage: (req: Request, res: Response) => void;
};

class EnergyUseController implements EnergyUseControllerType {
  getTotalEnergyUsage = async (req: any, res: any) => {
    try {
      const totalEnergyUsage = await EnergyUse.aggregate([
        {
          $group: {
            _id: null,
            totalEnergyUsage: { $sum: "$energyUse" },
          },
        },
      ]);

      res.json(totalEnergyUsage);
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  getEnergyUsage = async (req: any, res: any) => {
    try {
      // Get all energy use data
      const energyUse = await EnergyUse.find().exec();

      // sum all energy use data
      const totalEnergyUsage = energyUse.reduce((acc, curr) => acc + curr.energyUse, 0);

      res.json(totalEnergyUsage);
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  createEnergyUse = async (req: any, res: any) => {
    const { date, energyUse } = req.body;

    try {
      const newEnergyUse = await EnergyUse.create({ date, energyUse });
      res.json(newEnergyUse);
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  updateEnergyUse = async (req: any, res: any) => {
    const { id } = req.params;
    const { date, energyUse } = req.body;

    try {
      const updatedEnergyUse = await EnergyUse.findByIdAndUpdate(
        id,
        { date, energyUse },
        { new: true }
      ).exec();

      res.json(updatedEnergyUse);
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  deleteEnergyUse = async (req: any, res: any) => {
    const { id } = req.params;

    try {
      const deletedEnergyUse = await EnergyUse.findByIdAndDelete(id).exec();
      res.json(deletedEnergyUse);
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}

export default new EnergyUseController();

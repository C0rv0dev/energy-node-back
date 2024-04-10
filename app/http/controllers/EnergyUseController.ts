import EnergyUse from "../../models/EnergyUse";
import EnergyUseControllerInterface from "../../interfaces/controllers/EnergyUseControllerInterface";

class EnergyUseController implements EnergyUseControllerInterface {
  fetchEnergyUse = async (req: any, res: any) => {
    try {
      const energyUse = await EnergyUse.find().exec();
      res.json(energyUse);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

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

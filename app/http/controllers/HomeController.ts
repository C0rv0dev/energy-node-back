import AppSettings from "../../models/AppSettings";
import EnergyUse from "../../models/EnergyUse";
import { HomeControllerInterface } from "../interfaces/HomeControllerInterface"

class HomeController implements HomeControllerInterface {
  index = async (req: any, res: any) => {
    try {
      // Get all energy use data
      const appSettings = await AppSettings.find().exec();
      const energyUse = await EnergyUse.find().exec();

      // sum all energy use data
      const totalEnergyConsumed = energyUse.reduce((acc, curr) => acc + curr.energyUse, 0);

      // get the total energy consumption range from the app settings
      const totalEnergyConsumptionRange = appSettings.reduce((acc, curr) => acc + curr.totalConsumptionRange, 0);

      res.json({ usage: totalEnergyConsumed, totalUsage: totalEnergyConsumptionRange });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}

export default new HomeController();

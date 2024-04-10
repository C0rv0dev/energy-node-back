import AppSettings from "../../models/AppSettings";
import EnergyUse from "../../models/EnergyUse";
import HomeControllerInterface from "../interfaces/controllers/HomeControllerInterface"

type FirstLoad = {
  totalUsage: number;
  totalConsumptionRange: number;
  pricePerKwh: number;
}

class HomeController implements HomeControllerInterface {
  fetchSettings = async (req: any, res: any) => {
    try {
      // Get all energy use data
      const energyUse = await EnergyUse.find().exec();

      // Get all app settings
      const appSettings = await AppSettings.find().exec();

      // sum all energy use data
      const totalEnergyConsumed = energyUse.reduce((acc, curr) => acc + curr.energyUse, 0);

      // get the total energy consumption range from the app settings
      const totalEnergyConsumptionRange = appSettings[0].totalConsumptionRange ?? 0;

      // create a return object
      const settings: FirstLoad = {
        totalUsage: totalEnergyConsumed,
        totalConsumptionRange: totalEnergyConsumptionRange,
        pricePerKwh: appSettings[0].pricePerKwh ?? 0,
      };

      res.json(settings);
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}

export default new HomeController();

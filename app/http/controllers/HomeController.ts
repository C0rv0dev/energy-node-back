import AppSettings from "../../models/AppSettings";
import EnergyUse from "../../models/EnergyUse";
import HomeControllerInterface from "../../interfaces/controllers/HomeControllerInterface"

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
      const totalEnergyConsumed = energyUse.reduce((acc, curr) => acc + (curr?.energyUse || 0), 0);

      // get the total energy consumption range from the app settings
      const totalEnergyConsumptionRange = 0;

      // get the price per kWh 
      const pricePerKwh = 0;

      // create a return object
      const settings: FirstLoad = {
        totalUsage: totalEnergyConsumed,
        totalConsumptionRange: totalEnergyConsumptionRange,
        pricePerKwh,
      };

      res.json(settings);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "An error ocurred while fetching settings." });
    }
  }
}

export default new HomeController();

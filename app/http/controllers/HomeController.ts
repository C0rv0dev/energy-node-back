import AppSettings from "../../models/AppSettings";
import HomeControllerInterface from "../../interfaces/controllers/HomeControllerInterface"

type FirstLoad = {
  totalConsumptionRange: number;
  pricePerKwh: number;
}

class HomeController implements HomeControllerInterface {
  fetchSettings = async (req: any, res: any) => {
    try {
      // Get app settings for the user
      const appSettings = await this.getUserAppSettings(req, res);

      // get the total energy consumption range from the app settings
      const totalEnergyConsumptionRange = appSettings[0].totalConsumptionRange;

      // get the price per kWh 
      const pricePerKwh = appSettings[0].pricePerKwh;

      // create a return object
      const settings: FirstLoad = {
        totalConsumptionRange: totalEnergyConsumptionRange,
        pricePerKwh,
      };

      res.json(settings);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "An error ocurred while fetching settings." });
    }
  }

  private async getUserAppSettings(req: any, res: any): Promise<any> {
    // Get app settings for the user    
    let appSettings = await AppSettings.find({ user: req.user._id }).exec();

    // If no app settings exist for the user, create them
    if (!(appSettings.length > 0)) {
      await AppSettings.create({ user: req.user._id, pricePerKwh: 0, totalConsumptionRange: 0 });
      appSettings = await AppSettings.find({ user: req.user._id }).exec();
    }

    return appSettings;
  }
}

export default new HomeController();

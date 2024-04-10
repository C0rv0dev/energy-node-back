import AppSettings from '../../models/AppSettings';
import { AppSettingsControllerInterface } from '../interfaces/AppSettingsControllerInterface'

class AppSettingsController implements AppSettingsControllerInterface {
  updateSettings = async (req: any, res: any) => {
    const { totalConsumptionRange, pricePerKwh } = req.body;

    try {
      // Update or create settings
      const settings = await AppSettings.findOne().exec();
      if (settings) {
        settings.totalConsumptionRange = totalConsumptionRange;
        settings.pricePerKwh = pricePerKwh;

        await settings.save();
      } else {
        await AppSettings.create({ totalConsumptionRange, pricePerKwh });
      }
      
      res.status(200).json({ totalConsumptionRange, pricePerKwh });
    } catch (error) {
      res.status(400).json({ error });
    }
  };
}

export default new AppSettingsController();

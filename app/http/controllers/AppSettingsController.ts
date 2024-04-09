import AppSettings from '../../models/AppSettings';
import { AppSettingsControllerInterface } from '../interfaces/AppSettingsControllerInterface'

class AppSettingsController implements AppSettingsControllerInterface {
  updateSettings = async (req: any, res: any) => {
    const { totalConsumptionRange } = req.body;

    try {
      // Update or create settings
      const settings = await AppSettings.findOne().exec();
      if (settings) {
        settings.totalConsumptionRange = totalConsumptionRange;
        await settings.save();
      } else {
        await AppSettings.create({ totalConsumptionRange });
      }
      
      res.status(200).json({ totalConsumptionRange });
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  fetchSettings = (req: any, res: any) => {
    console.log('Fetching settings...');
  };
}

export default new AppSettingsController();

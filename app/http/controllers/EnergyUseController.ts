import EnergyUse from "../../models/EnergyUse";
import EnergyUseControllerInterface from "../../interfaces/controllers/EnergyUseControllerInterface";

class EnergyUseController implements EnergyUseControllerInterface {
  fetchEnergyUse = async (req: any, res: any) => {
    try {
      const { date } = req.body;
      let energyUseList: any = [];

      energyUseList = await EnergyUse.find({ user: req.user._id }).exec();

      if (date) {
        energyUseList = await EnergyUse.find({ user: req.user._id, date }).exec();
      }

      // get the difference between the meter readings to get the total energy usage
      const totalUsage = this.getTotalUsage(energyUseList);

      res.json({ records: energyUseList, totalUsage });
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  createEnergyUse = async (req: any, res: any) => {
    const { date, meter_reading, price_per_kwh } = req.body;
    const formattedDate = new Date(date).toLocaleDateString();

    try {
      await EnergyUse.create({ user: req.user._id, date: formattedDate, meter_reading, price_on_the_day: price_per_kwh });
      res.sendStatus(200);
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

  private getTotalUsage = (energyUseList: any) => {
    let totalUsage = 0;
    let previousReading = 0;

    energyUseList.forEach((record: any) => {
      if (previousReading <= 0) {
        previousReading = record.meter_reading;
        return;
      }

      totalUsage += (record.meter_reading - previousReading);
      previousReading = record.meter_reading;
    });

    return totalUsage;
  }
}

export default new EnergyUseController();

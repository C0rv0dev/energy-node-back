import EnergyUse from "../../models/EnergyUse";
import EnergyUseControllerInterface from "../../interfaces/controllers/EnergyUseControllerInterface";
import { EnergyUseRecord, RecordCollection } from "../../interfaces/models/RecordInterface";

class EnergyUseController implements EnergyUseControllerInterface {
  fetchEnergyUse = async (req: any, res: any) => {
    try {
      const { month } = req.body;
      let energyUseList: any = [];
      let recordsCollection: RecordCollection[] = [];

      energyUseList = await EnergyUse.find({ user: req.user._id }).exec();

      if (month) {
        // parse energy use list to get the records for the selected month
        energyUseList = energyUseList.filter((record: any) => {
          const recordDate = new Date(record.date);
          return (recordDate.getMonth() + 1) === month;
        });
      }

      // mount records into a collection ordered by year
      energyUseList.forEach((record: EnergyUseRecord) => {
        const recordDate = new Date(record.date);
        const year = recordDate.getFullYear();

        const recordCollection = recordsCollection.find((collection: RecordCollection) => collection.year === year);
        if (recordCollection) {
          recordCollection.records.push(record);
        } else {
          recordsCollection.push({ year, records: [record] });
        }
      });

      // get the difference between the meter readings to get the total energy usage
      const totalUsage = this.getTotalUsage(energyUseList);
      const dateOptions = this.getMonthOptions();

      res.json({ records: recordsCollection, totalUsage, dateOptions });
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
      const recordDate = new Date(record.date);
      const currentDate = new Date();
      if (recordDate.getMonth() !== currentDate.getMonth() || recordDate.getFullYear() !== currentDate.getFullYear()) return;

      if (previousReading <= 0) {
        previousReading = record.meter_reading;
        return;
      }

      totalUsage += (record.meter_reading - previousReading);
      previousReading = record.meter_reading;
    });

    return totalUsage;
  }

  clearEnergyUse = (req: any, res: any) => {
    try {
      EnergyUse.deleteMany({ user: req.user._id }).exec();
      res.sendStatus(200);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  private getMonthOptions() {
    const date = new Date();
    const year = date.getFullYear();
    const dateOptions: number[] = [];

    // get the last 12 months
    for (let i = 0; i < 12; i++) {
      const month = date.getMonth() - i;
      const newDate = new Date(year, month, 1);
      dateOptions.push(newDate.getMonth());
    }

    // filter date options by month in ascending order
    dateOptions.sort((a, b) => {
      return a - b;
    });

    return dateOptions;
  }
}

export default new EnergyUseController();

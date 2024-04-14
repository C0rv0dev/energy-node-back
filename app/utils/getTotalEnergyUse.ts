export const getTotalEnergyUse = (energyUseList: any) => {
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

import mongoose from "mongoose";

const AppSettingsSchema = new mongoose.Schema({
  totalConsumptionRange: { type: Number, required: true },
  pricePerKwh: { type: Number, required: true },
});

const AppSettings = mongoose.model("AppSettings", AppSettingsSchema);

export default AppSettings;

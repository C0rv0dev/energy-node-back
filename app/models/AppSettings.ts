import mongoose from "mongoose";

const AppSettingsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  pricePerKwh: { type: Number, required: true },
  totalConsumptionRange: { type: Number, required: true },
});

const AppSettings = mongoose.model("AppSettings", AppSettingsSchema);

export default AppSettings;

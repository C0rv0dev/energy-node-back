import mongoose from "mongoose";

const EnergyUseSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  energyUse: { type: Number, required: true },
});

const EnergyUse = mongoose.model("EnergyUse", EnergyUseSchema);

export default EnergyUse;

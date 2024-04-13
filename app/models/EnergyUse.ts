import mongoose from "mongoose";

const EnergyUseSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  meter_reading: {
    type: Number,
    required: true
  },
  price_on_the_day: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
});

const EnergyUse = mongoose.model("EnergyUse", EnergyUseSchema);

export default EnergyUse;

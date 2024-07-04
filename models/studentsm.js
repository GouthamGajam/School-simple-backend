import mongoose from "mongoose";

const StSchema = new mongoose.Schema(
    {
      Name: {
        type: String,
        required: [true, "Please enter the Student name"],
      },
      Age: {
        type: Number,
        required: [true, "Please enter the age"],
      },
      Batch: {
        type: String,
        required: [true, "Please enter the batch"],
      },
    }
  );

const StModel = mongoose.model("hotel", StSchema);
export default StModel;
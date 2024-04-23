import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.DB_CONN_STRING!).catch((error) => {
  console.log("Failed to connect to MongoDB:", error);
});

const timeout = 1000;

const masterSchema = new Schema(
  {
    DATA: Date,
    "CODI MUNICIPAL": String,
    NO: Number,
    NO2: Number,
    SO2: Number,
    INGRESSOS: Number,
    POBLACIO: Number,
    S_INGRESSOS: Number,
    N_INGRESSOS: Number,
  },
  {
    _id: false,
    bufferTimeoutMS: timeout,
    maxTimeMS: timeout,
  }
);

const visitSchema = new Schema(
  {
    date: String,
    visits: Number,
  },
  {
    _id: false,
    bufferTimeoutMS: timeout,
    maxTimeMS: timeout,
  }
);

export const Visit =
  mongoose.models.Visit || mongoose.model("Visit", visitSchema, "visits");

export const Master =
  mongoose.models.Master || mongoose.model("Master", masterSchema, "master");

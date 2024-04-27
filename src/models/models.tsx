import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.DB_CONN_STRING!).catch((error) => {
  console.log("Failed to connect to MongoDB:", error);
});

const timeout = 100000000;

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
    bufferTimeoutMS: timeout,
    maxTimeMS: timeout,
  }
);

const visitSchema = new Schema(
  {
    Sexe: String,
    'Data Alta Problema': Date,
    DIAGNOSTIC: String,
    NUMERO_CASOS: Number
  },
  {
    bufferTimeoutMS: timeout,
    maxTimeMS: timeout,
  }
);

const genereSchema = new Schema(
  {
    CODI_MUNICIPAL: String,
    Sexe: String,
    FranjaEdat: String,
    'Data Alta Problema': Date,
    NUMERO_CASOS: Number
  },
  {
    bufferTimeoutMS: timeout,
    maxTimeMS: timeout,
  }
);

export const Genere =
  mongoose.models.Genere || mongoose.model("Genere", genereSchema, "generes");

export const Visit =
  mongoose.models.Visit || mongoose.model("Visit", visitSchema, "visits");

export const Master =
  mongoose.models.Master || mongoose.model("Master", masterSchema, "master");

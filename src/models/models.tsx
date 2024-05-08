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
    "Data Alta Problema": Date,
    DIAGNOSTIC: String,
    NUMERO_CASOS: Number
  },
  {
    bufferTimeoutMS: timeout,
    maxTimeMS: timeout,
  }
);

const edatSchema = new Schema(
  {
    Sexe: String,
    'Data Alta Problema': Date,
    FranjaEdat: String,
    index: Number,
    NUMERO_CASOS: Number
  },
  {
    bufferTimeoutMS: timeout,
    maxTimeMS: timeout,
  }
);


const dinamicSchema = new Schema(
  {
    'Unnamed: 0': Number,
    DATA_SETMANA: String,
    Codi_municipi: Number,
    FranjaEdat: String,
    Sexe: String,
    DIAGNOSTIC: String,
    Nom_municipi: String,
    Latitud: Number,
    Longitud: Number,
    NO: Number,
    NO2: Number,
    SO2: Number,
    NUMERO_CASOS: Number,
    ICQA_NO2: String,
    ICQA_SO2: String
  },
  {
    bufferTimeoutMS: timeout,
    maxTimeMS: timeout,
  }
);


export const Visit =
  mongoose.models.Visit || mongoose.model("Visit", visitSchema, "visits");

export const Edat =
  mongoose.models.Edat || mongoose.model("Edat", edatSchema, "edats");

export const Master =
  mongoose.models.Master || mongoose.model("Master", masterSchema, "master");

export const Dinamic =
  mongoose.models.Dinamic || mongoose.model("Dinamic", dinamicSchema, "dinamics");

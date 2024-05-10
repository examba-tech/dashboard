import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.DB_CONN_STRING!).catch((error) => {
  console.log("Failed to connect to MongoDB:", error);
});

const timeout = 100000000;

const masterSchema = new Schema(
  {
    DATA: Date,
    CODI_MUNICIPAL: String,
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

const dinamicSchema = new Schema(
  {
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

const estaticSchema = new Schema(
  {
    Localitat: String,
    Sexe: String,
    FranjaEdat: String,
    DIAGNOSTIC: String,
    Numero_Casos: Number,
    municipi: String,
    valor: Number,
    Latitud: Number,
    Longitud: Number,
    NO2: Number,
    NO: Number,
    SO2: Number,
    "ICQA NO2": String,
    "ICQA SO2": String
  },
  {
    bufferTimeoutMS: timeout,
    maxTimeMS: timeout,
  }
);

const prediccionSchema = new Schema(
  {
    Nom_municipi: String,
    CODI_MUNICIPAL: Number,
    ANY: Number,
    MES: Number,
    DIA: Number,
    DIA_SETMANA: Number,
    NO_AVG: Number,
    NO2_AVG: Number,
    SO2_AVG: Number,
    POBLACIO: Number,
    INGRESSOS_AVG: Number
  },
  {
    bufferTimeoutMS: timeout,
    maxTimeMS: timeout,
  }
);

const mapaSchema = new Schema(
  {
    Codi_municipi: String,
    municipi: String,
    Latitud: Number,
    Longitud: Number,
    valor: Number,
    TN: Number,
    TX: Number,
    TM: Number,
    HRM: Number,
    PPT: Number,
    RS24h: Number,
    NO2: Number,
    NO: Number,
    SO2: Number,
    Numero_Casos: Number,
  },
  {
    bufferTimeoutMS: timeout,
    maxTimeMS: timeout,
  }
);


export const Master =
  mongoose.models.Master || mongoose.model("Master", masterSchema, "master");

export const Dinamic =
  mongoose.models.Dinamic || mongoose.model("Dinamic", dinamicSchema, "dinamics");

export const Estatic =
  mongoose.models.Estatic || mongoose.model("Estatic", estaticSchema, "estatics");

export const Prediccion =
  mongoose.models.Prediccion || mongoose.model("Prediccion", prediccionSchema, "prediccions");

export const Mapa =
  mongoose.models.Mapa || mongoose.model("Mapa", mapaSchema, "mapas");

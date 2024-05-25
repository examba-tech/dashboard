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
    DATA: Date,
    SETMANA: Number,
    ANY: Number,
    Codi_municipi: String,
    FranjaEdat: String,
    Sexe: String,
    DIAGNOSTIC: String,
    Nom_municipi: String,
    NO: Number,
    NO2: Number,
    SO2: Number,
    NUMERO_CASOS: Number,
    ICQA_NO2: String,
    ICQA_SO2: String,
    POBLACIO: Number,
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
    ICQA_NO2: String,
    ICQA_SO2: String,
    POBLACIO: Number,
  },
  {
    bufferTimeoutMS: timeout,
    maxTimeMS: timeout,
  }
);

const so2Schema = new Schema(
  {
    VALOR_SO2: Number,
    COUNT_SO2: Number,
    Codi_municipi: String,
    Nom_municipi: String,
  },
  {
    bufferTimeoutMS: timeout,
    maxTimeMS: timeout,
  }
);

const no2Schema = new Schema(
  {
    VALOR_NO2: Number,
    COUNT_NO2: Number,
    Codi_municipi: String,
    Nom_municipi: String,
  },
  {
    bufferTimeoutMS: timeout,
    maxTimeMS: timeout,
  }
);

const prediccionSchema = new Schema(
  {
    "Unnamed: 0": Number,
    CODI_MUNICIPAL: Number,
    ANY: Number,
    MES: Number,
    DIA: Number,
    TM: Number,
    RS24h: Number,
    NO_AVG: Number,
    NO2_AVG: Number,
    SO2_AVG: Number,
    POBLACIO: Number,
    INGRESSOS_AVG: Number,
    INGRESSOS: Number,
    INGRESSOS_DEUMIL: Number,
    NOM_MUNICIPI: String,
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
    ICQA_NO2: Number,
    ICQA_SO2: Number,
    total_poblacio: Number,
  },
  {
    bufferTimeoutMS: timeout,
    maxTimeMS: timeout,
  }
);

export const Master =
  mongoose.models.Master || mongoose.model("Master", masterSchema, "master");

export const Dinamic =
  mongoose.models.Dinamic ||
  mongoose.model("Dinamic", dinamicSchema, "dinamics");

export const Estatic =
  mongoose.models.Estatic ||
  mongoose.model("Estatic", estaticSchema, "estatics");

export const Prediccion =
  mongoose.models.Prediccion ||
  mongoose.model("Prediccion", prediccionSchema, "prediccions");

export const Mapa =
  mongoose.models.Mapa || mongoose.model("Mapa", mapaSchema, "mapas");

export const So2 =
  mongoose.models.So2 || mongoose.model("So2", so2Schema, "so2");

export const No2 =
  mongoose.models.No2 || mongoose.model("No2", no2Schema, "no2");

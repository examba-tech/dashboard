export interface Master {
  DATA: string;
  "CODI_MUNICIPAL": string;
  NO: number;
  NO2: number;
  SO2: number;
  INGRESSOS: number;
  POBLACIO: number;
  S_INGRESSOS: number;
  N_INGRESSOS: number;
}

export interface Cases {
  Sexe: String;
  "Data Alta Problema": Date;
  DIAGNOSTIC: String;
  NUMERO_CASOS: number;
}

export interface Cases1 {
  Sexe: String,
  'Data Alta Problema': Date,
  FranjaEdat: String,
  index: number,
  NUMERO_CASOS: number
}

export interface Dinamic {
  'Unnamed: 0': Number,
  DATA_SETMANA: String,
  CODI_MUNICIPAL: Number,
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
}
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

export interface Estatiques {
    Localitat: string,
    Sexe: string,
    FranjaEdat: string,
    DIAGNOSTIC: string,
    Numero_Casos: number,
    municipi: string,
    valor: number,
    Latitud: number,
    Longitud: number,
    NO2: number,
    NO: number,
    SO2: number,
    ICQA_NO2: string,
    ICQA_SO2: string
  }

  export interface Prediccions {
    //'Unnamed: 0': Number,
    CODI_MUNICIPAL: number,
    ANY: number,
    MES: number,
    DIA: number,
    DIA_SETMANA: number,
    NO_AVG: number,
    NO2_AVG: number,
    SO2_AVG: number,
    POBLACIO: number,
    INGRESSOS_AVG: number,
    NOM_MUNICIPI: String,
  }

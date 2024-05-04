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
    "ICQA NO2": string,
    "ICQA SO2": string
  }

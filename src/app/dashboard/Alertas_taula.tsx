import Alert from "@mui/material/Alert";

interface PredictionsAlertsProps {
  predictions: {
    CODI_MUNICIPAL: Number,
    ANY: Number,
    MES: Number,
    DIA: Number,
    DIA_SETMANA: Number,
    NO_AVG: Number,
    NO2_AVG: Number,
    SO2_AVG: Number,
    POBLACIO: Number,
    INGRESSOS_AVG: Number,
    INGRESSOS: Number,
    INGRESSOS_DEUMIL: Number,
    NOM_MUNICIPI: String,
  }[];
}

const PredictionsAlerts: React.FC<PredictionsAlertsProps> = ({ predictions }) => {
  const errorAlerts: React.ReactNode[] = [];
  const warningAlerts: React.ReactNode[] = [];
  const successAlerts: React.ReactNode[] = [];

   // Extract the date from the first prediction
   const { DIA, MES, ANY } = predictions[0];
   const formattedDate = `${Number(DIA)}/${Number(MES)}/${Number(ANY)}`;

  predictions.forEach((pred) => {
    if (Number(pred.INGRESSOS_DEUMIL) > 0.005) {
      errorAlerts.push(
        <Alert severity="error" style={{ marginBottom: "10px" }}>
          Crític! El municipi <strong>{pred.NOM_MUNICIPI}</strong> té una previsió <strong>alta</strong> d&apos;ingresos per la propera setmana.
        </Alert>
      );
    } else if (Number(pred.INGRESSOS_DEUMIL) > 0.003) {
      warningAlerts.push(
        <Alert severity="warning" style={{ marginBottom: "10px" }}>
          Compte! El municipi <strong>{pred.NOM_MUNICIPI}</strong> té una previsió <strong>mitja</strong> d&apos;ingresos per la propera setmana.
        </Alert>
      );
    } else if (Number(pred.INGRESSOS_DEUMIL) <= 0) {
      successAlerts.push(
        <Alert severity="success" style={{ marginBottom: "10px" }}>
          Bones notícies! El municipi <strong>{pred.NOM_MUNICIPI}</strong> té una previsió <strong>molt baixa</strong> d&apos;ingresos per la propera setmana.
        </Alert>
      );
    }
  });

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark flex-grow">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
            <h1 style={{ fontSize: "1.7rem", fontWeight: "bold" }}>
              <div className="overflow-y-auto" style={{ maxHeight: "200px", overflowY: "auto" }}>
                <p>Alertes de risc d'execssiu nombre de visites de patologies respiratòries agudes a causa de la contaminació als CAPs pel dia {formattedDate}🚨</p>
              </div>
            </h1>
            <br />
            <br />
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: "1.3rem", fontWeight: "bold", marginBottom: "10px" }}>Alertes d'alt risc</h2>
        {errorAlerts}
        <p>El llindar d'ingressos cada deu mil habitants considerat per a aquesta mena d'alertes d'alt risc és de &gt; 0.005</p>
        <br></br>

        <h2 style={{ fontSize: "1.3rem", fontWeight: "bold", marginTop: "20px", marginBottom: "10px" }}>Alertes de risc moderat</h2>
        {warningAlerts}
        <p>El llindar d'ingressos cada deu mil habitants considerat per a aquesta mena d'alertes de risc moderat és de &gt; 0.003</p>
        <br></br>

        <h2 style={{ fontSize: "1.3rem", fontWeight: "bold", marginTop: "20px", marginBottom: "10px" }}>Notícies positives 🙂</h2>
        {successAlerts}
        <p>El llindar d'ingressos cada deu mil habitants considerat per a aquests avisos positius és de ≤ 0 (ESTA MAL EVIDENTEMENTE) ❌</p>
      </div>
    </div>
  );
};

export default PredictionsAlerts;


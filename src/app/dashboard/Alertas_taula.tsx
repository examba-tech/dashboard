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

const PredictionsAlerts: React.FC<PredictionsAlertsProps> = ({
  predictions,
}) => {
  const alerts: React.ReactNode[] = [];

  predictions.forEach((pred) => {
    if (Number(pred.INGRESSOS_AVG) > Number(1.9)) {
      alerts.push(
        <Alert severity="error" style={{ marginBottom: "10px" }}>
          Compte! El municipi <strong>{pred.NOM_MUNICIPI}</strong> té una
          previsió d&apos;<strong>alts</strong> ingresos per la propera setmana.
        </Alert>
      );
    }
  });

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark flex-grow">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white pt-3">
            <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
              <div
                className="overflow-y-auto"
                style={{ maxHeight: "200px", overflowY: "auto" }}
              >
                Alertes 🚨
              </div>
            </h1>
            <br></br>
            <br></br>
          </h5>
        </div>
      </div>
      <div>{alerts}</div>;
    </div>
  );
};
export default PredictionsAlerts;

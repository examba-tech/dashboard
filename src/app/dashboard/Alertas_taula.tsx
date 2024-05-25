import Alert from "@mui/material/Alert";
import { useState } from "react";
import { buttonVariants } from "@/src/components/ui/Button";

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
  
  const [closedAlerts, setClosedAlerts] = useState<string[]>([]);

  const handleClose = (municipi: string) => {
    setClosedAlerts([...closedAlerts, municipi]);
  };

  const handleReset = () => {
    setClosedAlerts([]);
  };

  const errorAlerts: React.ReactNode[] = [];
  const warningAlerts: React.ReactNode[] = [];

  // Extract the date from the first prediction
  //const { DIA, MES, ANY } = predictions[0];
  // const formattedDate = `${Number(DIA)}/${Number(MES)}/${Number(ANY)}`;

  predictions.forEach((pred) => {
    if (closedAlerts.includes(pred.NOM_MUNICIPI.toString())) return;

    if (Number(pred.INGRESSOS_DEUMIL) > 10) {
      errorAlerts.push(
        <Alert 
          severity="error" 
          style={{ marginBottom: "10px" }} 
          onClose={() => handleClose(pred.NOM_MUNICIPI.toString())}
        >
          Crític! El municipi <strong>{pred.NOM_MUNICIPI}</strong> té una previsió <strong>alta</strong> de visites per la propera setmana.
        </Alert>
      );
    } else if (Number(pred.INGRESSOS_DEUMIL) > 8) {
      warningAlerts.push(
        <Alert 
          severity="warning" 
          style={{ marginBottom: "10px" }} 
          onClose={() => handleClose(pred.NOM_MUNICIPI.toString())}
        >
          Compte! El municipi <strong>{pred.NOM_MUNICIPI}</strong> té una previsió <strong>mitja</strong> de visites per la propera setmana.
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
              <p>Alertes de risc del nombre de visites de patologies respiratòries agudes a causa de la contaminació als municipis per la propera setmana🚨</p>
            </div>
          </h1>
          <br />
          <br />
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: "1.3rem", fontWeight: "bold", marginBottom: "10px" }}>Alertes d&apos;alt risc</h2>
        <p>El llindar de visites cada deu mil habitants considerat per a aquesta mena d&apos;alertes d&apos;alt risc és de &gt; 10</p>
        <br></br>
        {errorAlerts.length > 0 ? errorAlerts : <p>No hi ha alertes d&apos;alt risc.</p>}
        <br />

        <h2 style={{ fontSize: "1.3rem", fontWeight: "bold", marginTop: "20px", marginBottom: "10px" }}>Alertes de risc moderat</h2>
        <p>El llindar de visites cada deu mil habitants considerat per a aquesta mena d&apos;alertes de risc moderat és de &gt; 8</p>
        <br></br>
        {warningAlerts.length > 0 ? warningAlerts : <p>No hi ha alertes de risc moderat.</p>}
        <br />
      </div>
      <br />

      <div className="flex justify-center mt-5">
        <button
          onClick={handleReset}
          onMouseDown={(e) => e.preventDefault()}
          className={buttonVariants({ className: "w-full max-w-xs", variant: "outline" })}
        >
          Recuperar alertes esborrades
        </button>
      </div>

    </div>
  );
};

export default PredictionsAlerts;


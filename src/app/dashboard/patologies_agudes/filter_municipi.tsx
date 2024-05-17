import React from "react";
import SingleSelectChip from "@/src/app/dashboard/patologies_agudes/select";

interface FiltersProps {
    selectedMunicipi: string;
    onMunicipiChange: (municipi: string) => void;
}

const Filters_municipi: React.FC<FiltersProps> = ({
    selectedMunicipi,
  onMunicipiChange,
}) => {

  return (
    <div>
      <SingleSelectChip
        selectedValue={selectedMunicipi}
        onSelectedValueChange={(column, value) => onMunicipiChange(value)}
        options={['Tots', 'Abrera', 'Avinyonet del Penedès', 'Begues', 'Les Cabanyes',
        'Canyelles', 'Castelldefels', 'Castellet i la Gornal',
        'Castellví de la Marca', 'Castellví de Rosanes', 'Cervelló', 'Collbató',
        'Corbera de Llobregat', 'Cornellà de Llobregat',
        'Cubelles', 'Esparreguera', 'Esplugues de Llobregat', 'Font-rubí',
        'Gavà', 'Gelida', 'La Granada', 'Hospitalet de Llobregat',
        'Martorell', 'Mediona', 'Molins de Rei', 'Olèrdola',
        'Olesa de Bonesvalls', 'Olesa de Montserrat', 'Olivella',
        'Pacs del Penedès', 'Pallejà', 'El Papiol', 'El Pla del Penedès',
        'Pontons', 'El Prat de Llobregat', 'Puigdàlber',
        'Sant Andreu de la Barca', 'Sant Boi de Llobregat',
        'Sant Climent de Llobregat', 'Sant Cugat Sesgarrigues',
        'Sant Esteve Sesrovires', 'Sant Feliu de Llobregat',
        'Sant Joan Despí', 'Sant Just Desvern', "Sant Llorenç d'Hortons",
        'Sant Martí Sarroca', 'Sant Pere de Ribes',
        'Sant Pere de Riudebitlles', 'Sant Quintí de Mediona',
        "Sant Sadurní d'Anoia", 'Santa Coloma de Cervelló',
        'Santa Fe del Penedès', 'Santa Margarida i els Monjos',
        'Sant Vicenç dels Horts', 'Sitges', 'Subirats', 'Torrelavit',
        'Torrelles de Foix', 'Torrelles de Llobregat', 'Vallirana',
        'Viladecans', 'Vilobí del Penedès', 'Vilafranca del Penedès',
        'Vilanova i la Geltrú', 'La Palma de Cervelló']}
        label="Selecciona un segon municipi"
        which_column="Nom_municipi"
      />
    </div>
  );
};

export default Filters_municipi;
"use client"
import React, { useState } from 'react';
import MyMapa from '../../components/mapas/MyMapa_cont';

const HomePage = () => {

  const [estacionesExpandidas, setEstacionesExpandidas] = useState([]);

  // Función para alternar la expansión de una estación
  const toggleExpansion = (index) => {
    if (estacionesExpandidas.includes(index)) {
      setEstacionesExpandidas(estacionesExpandidas.filter((item) => item !== index));
    } else {
      setEstacionesExpandidas([...estacionesExpandidas, index]);
    }
  };

  const estacionesMeteorologicas = [
    { nombre: 'Estació de Cubelles', info: <p>L'estació es troba al centre de Cubelles, 
      al carrer Major. Consisteix en una estació suburbana, que es troba també bastant 
      a prop del Riu Foix, i la carretera més porpera és la C-31.</p>},
    { nombre: 'Estació de Cornellà', info: <p> L’estació està rodejada de 2 escoles, 
      1 institut i una piscina municipal (és més o menys cèntrica). Toca les vies del tren, 
      i l’A-2 queda a 1.5km aprox. A més es troba situada a menys de 2km d'un polígon industrial
      i del Riu Llobregat.</p> },
    { nombre: 'Estació de Gavà', info: <p> L’estació està situada tocant el Parc del Garraf, un 
      parc natural de 12.376 hectàrees. No hi ha grans carreteres a prop i es troba allunyat del 
      que és la població de Gavà com a tal (és a dir, no és una estació cèntrica). Lo més proper són
      les vies del tren, que passen a menys de 2km de distància de la seva ubicació. </p>},
    { nombre: 'Estació de Hospitalet de Llobregat', info: <p> L’estació està situada al costat 
      d’un parc (Parc dels ocellets). És una estació urbana, està situada al centre de la ciutat, 
      entre el barri de Collblanc i el barri de Torrassa. A més, a prop es troben carreteres bastant 
      importants, com l'Autopista (a menys de 2km) i la carretera nacional (a menys d'1km). Està tocant 
      també les vies de tren, a menys de mig km d'elles.
    </p>},
    { nombre: 'Estació de Martorell', info: <p>Estació bastant cèntrica dins el poble de Martorell. Tot 
      i això, es troba a prop (a menys de 2km) d'un parc natural, d'un polígon industrial i del Riu 
      Llobregat. Està tocant la Carretera Nacional, i a menys d'1km de l'Autopista i les vies de tren.
    </p>},
    { nombre: 'Estació de Pallejà', info: <p>L’estació està a una urbanització allunyada del poble de 
      Pallejà com a tal. És una zona bastant rural, tocant un parc natural, i hi ha poques vivendes al 
      voltant. Pel centre de Pallejà passa la carretera N-11 (queda a menys de 1km) i la carretera 
      més propera a l’estació és la B-24, a 300m aprox. A més, a prop es troben també les vies de tren,
      a menys d'1km, i el Riu Llobregat a menys de 2km.
    </p> },
    { nombre: 'Estació de Sant Andreu de la Barca', info: <p>Estació situada a l’escola Josep Pla, quasi 
      tocant l’autopista A-2 i una Carretera Nacional. No és gens cèntrica, i està al costat també d'un
      polígon i del Riu Llobregat, bastant a prop també de les vies de tren.</p>},
    { nombre: 'Estació de Sant Feliu de Llobregat', info: <p>L’estació està ubicada a l’escola Miquel 
      Martí i Pol, lluny de carreteres i autopistes. La carretera més propera és la N-340, a 
      (aproximadament) 1.5km. A només 500m es troba el Parc Natural de Collserola, no és cèntrica.
      Se situa també a menys d'1km d'un pplígon i a menys de 2km de les vies de tren.
      </p> },
    { nombre: 'Estació de Sant Just Desvern', info: <p> Estació propera a la N-340 (a només 290m) i a 
      l'Autopista. És més o menys cèntrica, a uns 850m del Parc Natural de Collserola, i quasi tocant
      un polígon industrial. Podem destacar també que es troba a menys de 2km de les vies de tren.
    </p>},
    { nombre: 'Estació de Sant Vicenç dels Horts', info: <p>De les dues estacions de Sant Vicenç és 
      la que queda més lluny del nucli del poble (és a dir, no és cèntrica). Està a 300m d’un polígon 
      industrial i a aprox 650m de la carretera N-340. A més, és a menys de 2km d'un parc natural i 
      del Riu Llobregat, i cal destacar que està a menys d'1km de camps de cultiu. Les vies de tren
      passen a menys de 500m de l'estació.</p>},
    { nombre: 'Estació de Sant Vicenç dels Horts, Ribot', info: <p>Aquesta estació queda més cèntrica 
      que l'altre situada a Sant Vicenç, però a 50m aprox de la via del tren, i a menys d'1km de la 
      Carretera Nacional i de l'Autopista (per tant, és més o menys cèntrica). Cal destacar també la 
      proximitat del Riu Llobregat i de camps de cultiu a menys de 500m.
    </p>},
    { nombre: 'Estació de Santa Margarida i els Monjos', info: <p>Estació que està tocant la carretera N-340,
      a menys de 500m del Riu Foix. És bastant cèntrica, a aproximadament 1km de les vies de tren, però la zona
      com a tal on està és rural majoritàriament.
    </p> },
    { nombre: 'Estació de Viladecans', info: <p>Estació situada al costat del pavelló municipal, al centre del poble. 
      La carretera més propera és la C-32, a una mica més de 1.6km. A les seves proximitats trobem un polígon
      i les vies de tren a aproximadament 1km.
    </p> },
    { nombre: 'Estació de Vilanova i la Geltrú, les llunes ', info: <p>Semblant a l’estació de pl. Danses (que és 
      l'altre situada a Vilanova i la Geltrú) però més a prop de Les Roquetes del Garraf. No és cèntrica i es
      troba bastant lluny de totes les carreteres i autopistes, a uns 2km d'un polígon i a menys d'1km de les vies 
      de tren. A més, cal remarcar que es troba també a menys d'1km del mar.
    </p> },
    { nombre: 'Estació de Vilanova i la Geltrú, pl Danses', info: <p>Estació de característiques similars a l’altra 
      que hi ha a Vilanova (la de les llunes), encara que aquesta està més allunyada del que seria el nucli urbà 
      i es troba més propera a uns camps que hi ha al costat de la ciutat. Està més propera a la platja, però 
      continua estant a 1km d’allà. Està quasi tocant les vies de tren.
    </p>},
    { nombre: 'Estació de Vilafranca', info: <p>L’estació es troba allunyada del municipi. No està propera a cap 
      gran carretera i queda tocant camps de cultiu (a menys de 500m d'aquests) i el camp de futbol municipal, 
      ja que precissament es troba a la zona esportiva de Vilafranca.
    </p>},
    { nombre: 'Estació del Prat, esglesia', info: <p>Estació lluny del centre, tocant la C-31 i a menys
      d'1km d'un polígon industrial i de les vies de tren. A més, es troba a prop també del Riu Llobregat, i 
      una mica més lluny hi ha l'autopista.
    </p> },
    { nombre: 'Estació del Prat, Sant Cosme', info: <p>Estació que es troba tocant un polígon i l'Autopista, al costat també 
      de la C-31. No és gens cèntrica, i té les vies de tren i terres de cultiu a uns 2km aproximadament.
    </p> }
    

  ];
  return (
    <div>
        <h1><strong style={{ fontWeight: 'bold', fontSize: '24px'}}>ESTACIONS DE CONTAMINACIÓ:</strong></h1>
        <br />
      <MyMapa />
      <br />
      <h1><strong style={{ fontWeight: 'bold' , fontSize: '18px'}}>DESCRIPCIÓ DE LES ESTACIONS:</strong></h1>
      <br />
      <p>Les dades diàries respecte dels contaminants per realitzar la predicció han estat 
        recollides gràcies a les diferents estacions de contaminats dels municipis de 
        la Regió Metropolitana Sud, concretament les situades als llocs següents. Cal 
        destacar que tot i que hi hagi estacions manuals i automàtiques, en aqeust apartat 
        només hem reflectit les automàtiques, ja que són de les que hem extret la majoria 
        d'informació, amb excepció d'alguns contaminants com el PM10. A més, moltes de les 
        coordenades de les estacions manuals i de les estacions automàtiques se situaven a menys
        de 10 metres i per tant hem considerat que eren la mateixa estació Més concretament, 
        les dades de contaminació han estat extretes a partir de <a href="https://mediambient.gencat.cat/ca/05_ambits_dactuacio/atmosfera/qualitat_de_laire/vols-saber-que-respires/descarrega-de-dades/descarrega-dades-automatiques/"
        target="_blank" rel="noopener noreferrer" style={{ color: 'blue' , textDecoration: 'underline'}}>Dades automàtiques de Medi Ambient 
        i Sostenibilitat de la Generalitat de Catalunya</a> i les dades de les estacions corresponents
        a partir de <a href="https://analisi.transparenciacatalunya.cat/Medi-Ambient/Qualitat-de-l-aire-als-punts-de-mesurament-autom-t/tasf-thgu/data_preview"  target="_blank" rel="noopener noreferrer"
        style={{ color: 'blue' , textDecoration: 'underline'}}>Dades obertes de Catalunya: qualitat de l'aire</a>
      </p> 

      <p>Els contaminants que hem obtingut de les estacions i mitjançant els quals hem fet la 
        predicció finalment són: ...</p>

      <br />
      <ul style={{ listStyleType: 'disc',marginLeft: '50px' }}>
        {estacionesMeteorologicas.map((estacion, index) => (
          <li key={index}>
            <span onClick={() => toggleExpansion(index)}>
              <strong style={{ fontWeight: 'bold' }}>{estacion.nombre}</strong>
            </span>
            {estacionesExpandidas.includes(index) && (
              <div style={{ marginLeft: '20px' }}>
              <p>{estacion.info}</p>
            </div>
            )}
          </li>
        ))}
      </ul>
      <br />
      <br />
      <br />


    </div>
  );
};

export default HomePage;
"use client"
import React, { useState } from 'react';
import MyMapa from '../../../components/mapas/MyMapa_cont';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";



const HomePage = () => {

  //const [estacionesExpandidas, setEstacionesExpandidas] = useState([]);
  const [estacionesExpandidas, setEstacionesExpandidas] = useState<number[]>([]);

  // Función para alternar la expansión de una estación
  const toggleExpansion = (index: number) => {
    if (estacionesExpandidas.includes(index)) {
      setEstacionesExpandidas(estacionesExpandidas.filter((item) => item !== index));
    } else {
      setEstacionesExpandidas([...estacionesExpandidas, index]);
    }
  };

  //const [estacionesExpandidas, setEstacionesExpandidas] = useState([]);
  const [contaminantesExpandidos, setcontaminantesExpandidos] = useState<number[]>([]);

  // Función para alternar la expansión de una estación
  const toggleExpansion2 = (index: number) => {
    if (contaminantesExpandidos.includes(index)) {
      setcontaminantesExpandidos(contaminantesExpandidos.filter((item) => item !== index));
    } else {
      setcontaminantesExpandidos([...contaminantesExpandidos, index]);
    }
  };

  const [infoExpandida, setinfoExpandida] = useState<number[]>([]);
  const toggleExpansion3 = (index: number) => {
    if (infoExpandida.includes(index)) {
      setinfoExpandida(infoExpandida.filter((item) => item !== index));
    } else {
      setinfoExpandida([...infoExpandida, index]);
    }
  };

  const informació = [
    {
      nombre: '+info', info: <div>
        <p style={{ marginBottom: '5px', textAlign: 'justify' }}>
          En aquesta secció es troba la informació de les estacions de contaminació. Primer trobem un
          mapa que ens permet veure la localització de cadascuna d&apos;aquestes estacions, i es pot clicar 
          per veure la informació més rellevant corresponent. A més, això va seguit d&apos;informació 
          addicional de cadascuna d&apos;aquestes estacions, i dels contaminants que finalment utilitzem
          per realitzar l&apos;estudi de l&apos;afectació respecte el nombre de visites degudes a malalties 
          respiratòries. Al final podem veure també un petit anàlisi dels rangs establerts pels possibles valors 
          de l&apos;ICQA dels contaminants anteriors.
          </p>
        {/* <p style={{ marginBottom: '5px' }}>Hola</p> */}
      </div>
    },
  ];

  

  const estacionesMeteorologicas = [
    { nombre: 'Estació de Cubelles', info: <p style={{ textAlign: 'justify' }}>L&apos;estació es troba al centre de Cubelles, 
      al carrer Major. Consisteix en una estació suburbana, que es troba també bastant 
      a prop del Riu Foix, i la carretera més porpera és la C-31.</p>},
    { nombre: 'Estació de Cornellà', info:  <p style={{ textAlign: 'justify' }}> L&apos;estació està rodejada de 2 escoles, 
      1 institut i una piscina municipal (és més o menys cèntrica). Toca les vies del tren, 
      i l’A-2 queda a 1.5km aprox. A més es troba situada a menys de 2km d&apos;un polígon industrial
      i del Riu Llobregat.</p> },
    { nombre: 'Estació de Gavà', info:  <p style={{ textAlign: 'justify' }}> L&apos;estació està situada tocant el Parc del Garraf, un 
      parc natural de 12.376 hectàrees. No hi ha grans carreteres a prop i es troba allunyat del 
      que és la població de Gavà com a tal (és a dir, no és una estació cèntrica). El que queda més proper són
      les vies del tren, que passen a menys de 2km de distància de la seva ubicació. </p>},
    { nombre: 'Estació de Hospitalet de Llobregat', info:  <p style={{ textAlign: 'justify' }}> L&apos;estació està situada al costat 
      d&apos;un parc (Parc dels ocellets). És una estació urbana, està situada al centre de la ciutat, 
      entre el barri de Collblanc i el barri de Torrassa. A més, a prop es troben carreteres bastant 
      importants, com l&apos;autopista (a menys de 2km) i la carretera nacional (a menys d&apos;1km). Està tocant 
      també les vies de tren, a menys de mig km d&apos;elles.
    </p>},
    { nombre: 'Estació de Martorell', info:  <p style={{ textAlign: 'justify' }}>Estació bastant cèntrica dins el poble de Martorell. Tot 
      i això, es troba a prop (a menys de 2km) d&apos;un parc natural, d&apos;un polígon industrial i del riu 
      Llobregat. Està tocant la Carretera Nacional, i a menys d&apos;1km de l&apos;autopista i les vies de tren.
    </p>},
    { nombre: 'Estació de Pallejà', info:  <p style={{ textAlign: 'justify' }}>L&apos;estació es troba en una urbanització allunyada del poble. És una zona bastant rural, tocant un parc natural i hi ha poques vivendes al 
      voltant. Pel centre de Pallejà passa la carretera N-11 (queda a menys de 1km) i la carretera 
      més propera a l&apos;estació és la B-24, a 300m aproximadament. A més, a prop es troben també les vies de tren,
      a menys d&apos;1km, i el Riu Llobregat a menys de 2km.
    </p> },
    { nombre: 'Estació de Sant Andreu de la Barca', info:  <p style={{ textAlign: 'justify' }}>Estació situada a l&apos;escola Josep Pla, quasi 
      tocant l&apos;autopista A-2 i una carretera nacional. No és gens cèntrica, i es propera a un
      polígon i al riu Llobregat, bastant a prop també de les vies de tren.</p>},
    { nombre: 'Estació de Sant Feliu de Llobregat', info:  <p style={{ textAlign: 'justify' }}>L&apos;estació està ubicada a l&apos;escola Miquel 
      Martí i Pol, lluny de carreteres i autopistes. La carretera més propera és la N-340, a 
      (aproximadament) 1.5km. A només 500m es troba el Parc Natural de Collserola, no és una estació cèntrica.
      Se situa també a menys d&apos;1km d&apos;un polígon i a menys de 2km de les vies de tren.
      </p> },
    { nombre: 'Estació de Sant Just Desvern', info:  <p style={{ textAlign: 'justify' }}> Estació propera a la N-340 (a només 290m) i a 
      l&apos;autopista. És més o menys cèntrica, a uns 850m del Parc Natural de Collserola, i quasi tocant
      un polígon industrial. Podem destacar també que es troba a menys de 2km de les vies de tren.
    </p>},
    { nombre: 'Estació de Sant Vicenç dels Horts', info:  <p style={{ textAlign: 'justify' }}>De les dues estacions de Sant Vicenç és 
      la que queda més lluny del nucli del poble (és a dir, no és cèntrica). Està a 300m d&apos;un polígon 
      industrial i a aprox 650m de la carretera N-340. A més, és a menys de 2km d&apos;un parc natural i 
      del riu Llobregat, i cal destacar que està a menys d&apos;1km de camps de cultiu. Les vies de tren
      passen a menys de 500m de l&apos;estació.</p>},
    { nombre: 'Estació de Sant Vicenç dels Horts, Ribot', info:  <p style={{ textAlign: 'justify' }}>Aquesta estació queda més cèntrica 
      que l&apos;altre situada a Sant Vicenç, però a 50m aprox de la via del tren, i a menys d&apos;1km de la 
      carretera nacional i de l&apos;autopista (per tant, és més o menys cèntrica). Cal destacar també la 
      proximitat del riu Llobregat i de camps de cultiu a menys de 500m.
    </p>},
    { nombre: 'Estació de Santa Margarida i els Monjos', info:  <p style={{ textAlign: 'justify' }}>Estació que està tocant la carretera N-340,
      a menys de 500m del Riu Foix. És bastant cèntrica, a aproximadament 1km de les vies de tren, però la zona
      com a tal on està és rural majoritàriament.
    </p> },
    { nombre: 'Estació de Viladecans', info:  <p style={{ textAlign: 'justify' }}>Estació situada al costat del pavelló municipal, al centre del poble. 
      La carretera més propera és la C-32, a una mica més de 1.6km. A les seves proximitats trobem un polígon
      i les vies de tren a aproximadament 1km.
    </p> },
    { nombre: 'Estació de Vilanova i la Geltrú, les Llunes ', info:  <p style={{ textAlign: 'justify' }}>Semblant a l&apos;estació de pl. Danses (que és 
      l&apos;altra situada a Vilanova i la Geltrú) però més a prop de Les Roquetes del Garraf. No és cèntrica i es
      troba bastant lluny de totes les carreteres i autopistes, a uns 2km d&apos;un polígon i a menys d&apos;1km de les vies 
      de tren. A més, cal destacar que es troba també a menys d&apos;1km del mar.
    </p> },
    { nombre: 'Estació de Vilanova i la Geltrú, pl Danses', info:  <p style={{ textAlign: 'justify' }}>Estació de característiques similars a l&apos;altra 
      que hi ha a Vilanova (la de les Llunes), encara que aquesta està més allunyada del que seria el nucli urbà 
      i es troba més propera a uns camps propers a la ciutat. Està més propera a la platja, però 
      continua estant a 1km d’allà. Està quasi tocant les vies de tren.
    </p>},
    { nombre: 'Estació de Vilafranca', info:  <p style={{ textAlign: 'justify' }}>L&apos;estació es troba allunyada del municipi. No està propera a cap 
      gran carretera i queda tocant camps de cultiu (a menys de 500m d&apos;aquests) i el camp de futbol municipal, 
      ja que, precisament, es troba a la zona esportiva de Vilafranca.
    </p>},
    { nombre: 'Estació del Prat, esglesia', info:  <p style={{ textAlign: 'justify' }}>Estació allunyada del centre, tocant la C-31 i a menys
      d&apos;1km d&apos;un polígon industrial i de les vies de tren. A més, es troba a prop també del riu Llobregat, i, 
      una mica més lluny, hi ha l&apos;autopista.
    </p> },
    { nombre: 'Estació del Prat, Sant Cosme', info:  <p style={{ textAlign: 'justify' }}>Estació que es troba tocant un polígon i l&apos;autopista. Propera també 
      a la C-31. No és gens cèntrica, i té les vies de tren i terres de cultiu a uns 2km aproximadament.
    </p>},
  ];


  const contaminantes = [
    {
      nombre: 'NO2, Diòxid de Nitrogen', info: <div>
        <p style={{ marginBottom: '5px', textAlign: 'justify' }}>El diòxid de nitrogen és Gas format per dos àtoms d’oxigen 
          i un de nitrogen. És un dels elements del boirum fotoquímic 
          i precursor de l’àcid nítric, que ès un dels constituents de 
          la pluja àcida. L&apos;NO2 en presència de la llum ultraviolada és
          la font principal de l&apos;ozó troposfèric.</p>
        <p style={{ marginBottom: '5px' }}>El seu origen es troba en el trànsit (tant terrestre,
          aeri com marítim) i en la indústria.</p>
        <p style={{ marginBottom: '5px' }}>La inhalació d&apos;NO2 pot provocar inflamació de les vies respiratòries,
          reducció de la funció pulmonar i pot augmentar els símptomes de
          bronquitis en infants asmàtics.</p>
        <p style={{ marginBottom: '5px' }}>Segons l&apos;ICQA, superar els 120 µg/m³ en una hora ja es considera que
          qualitat de l&apos;aire es desfavorable.</p>
      </div>
    },
    {
      nombre: 'SO2, Diòxid de Sofre', info: <div>
        <p style={{ marginBottom: '5px', textAlign: 'justify' }}>
          EL diòxid de sofre és un gas incolor i d’olor forta i sufocant. En una 
          atmosfera humida es transforma en àcid sulfúric i causa la deposició àcida.
          A partir de concentracions &gt;0.1 ppm es produeix una important reducció de la 
          visibilitat. Actua com a precursor de la formació de sulfat amònic, el qual 
          incrementa els nivells de PM10 i PM2.5.
        </p>
        <p style={{ marginBottom: '5px' }}>
          El seu origen es troba en les refineries de petroli, el trànsit, les centrals
          tèrmiques, la combustió de carburants i les cimenteres.
        </p>
        <p style={{ marginBottom: '5px' }}>
          L&apos;exposició a SO2 pot provocar irritació i inflamació del sistema respiratori, 
          afeccions i insuficiències pulmonars, alteració del metabolisme de les proteïnes 
          i mal de cap.
        </p>
        <p style={{ marginBottom: '5px' }}>
          Segons l&apos;ICQA, superar els 350 µg/m³ en una hora ja es considera que
          qualitat de l&apos;aire es desfavorable.
        </p>
      </div>
    },
  ];


  return (
    <div>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Estacions de Contaminació</h1>
        <ul style={{ marginLeft: '400px', marginTop: '-33px' }}>
        {informació.map((informació, index) => (
          <li key={index}>
            <span onClick={() => toggleExpansion3(index)}>
              <strong style={{ color: 'gray' }} >{informació.nombre}</strong>
              {infoExpandida.includes(index) ? (
                <FontAwesomeIcon icon={faChevronUp} style={{  color: 'gray', marginLeft: '5px' }} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown} style={{  color: 'gray', marginLeft: '5px' }} />
              )}
            </span>
            {infoExpandida.includes(index) && (
              <div style={{ marginLeft: '-399px', marginTop: '20px' }}>
                <p>{informació.info}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
        <br />
      <MyMapa />
      <br />
      <h1><strong style={{ fontWeight: 'bold', fontSize: '20px', textDecoration: 'underline' }}>Descripció de les estacions</strong></h1>
      <br />
      <p style={{ textAlign: 'justify' }}>Les dades diàries dels contaminants per realitzar la predicció han estat 
        recollides a partir de les diferents <span style={{ fontWeight: 'bold' }}>estacions de contaminats</span> dels municipis de 
        la Regió Metropolitana Sud, concretament les situades als llocs llistats a sota. Cal 
        destacar que en aquest apartat només es mostren les estacions automàtiques, ja que 
        són d&apos;on hem extret la majoria d&apos;informació. Més concretament, 
        les dades de contaminació han estat extretes a partir de <a href="https://mediambient.gencat.cat/ca/05_ambits_dactuacio/atmosfera/qualitat_de_laire/vols-saber-que-respires/descarrega-de-dades/descarrega-dades-automatiques/"
        target="_blank" rel="noopener noreferrer" style={{ color: 'blue' , textDecoration: 'underline'}}>Dades automàtiques de Medi Ambient 
        i Sostenibilitat de la Generalitat de Catalunya</a> i les dades de les estacions corresponents
        a partir de <a href="https://analisi.transparenciacatalunya.cat/Medi-Ambient/Qualitat-de-l-aire-als-punts-de-mesurament-autom-t/tasf-thgu/data_preview"  target="_blank" rel="noopener noreferrer"
        style={{ color: 'blue' , textDecoration: 'underline'}}>Dades obertes de Catalunya: qualitat de l&apos;aire</a>. Totes les fonts de dades han sigut
        integrades seguint un procediment exhaustiu i rigurós de neteja.
      </p> 
      <br />
      
      <ul style={{ listStyleType: 'disc',marginLeft: '50px' }}>
        {estacionesMeteorologicas.map((estacion, index) => (
          <li key={index}>
            <span onClick={() => toggleExpansion(index)}>
              <strong style={{ fontWeight: 'bold' }}>{estacion.nombre}</strong>
              {estacionesExpandidas.includes(index) ? (
                <FontAwesomeIcon icon={faChevronUp} style={{ marginLeft: '5px' }} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown} style={{ marginLeft: '5px' }} />
              )}
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
      <p style={{ textAlign: 'justify' }}>Els <span style={{ fontWeight: 'bold' }}>contaminants</span> que hem obtingut de les estacions i mitjançant els quals hem fet la 
        predicció finalment són el NO2 i SO2:</p>

      <br />
      <ul style={{ listStyleType: 'disc',marginLeft: '50px' }}>
        {contaminantes.map((contaminante, index) => (
          <li key={index}>
            <span onClick={() => toggleExpansion2(index)}>
              <strong style={{ fontWeight: 'bold' }}>{contaminante.nombre}</strong>
              {contaminantesExpandidos.includes(index) ? (
                <FontAwesomeIcon icon={faChevronUp} style={{ marginLeft: '5px' }} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown} style={{ marginLeft: '5px' }} />
              )}
            </span>
            {contaminantesExpandidos.includes(index) && (
              <div style={{ marginLeft: '20px' }}>
                <p>{contaminante.info}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
      <br />
      <p style={{ textAlign: 'justify' }}>L&apos;<span style={{ fontWeight: 'bold' }}>ICQA</span> és el sistema d&apos;informació pública de l&apos;estat de la qualitat de l&apos;aire implantat 
      a Catalunya des del gener de 1995. Vol ser l&apos;eina que ens permeti informar tothom de forma clara, directa 
      i ràpida sobre la qualitat de l&apos;aire que respirem, que garanteixi amb efectivitat el dret que tenim tots 
      els ciutadans d&apos;accedir a la informació ambiental. Tot i això, cal esmentar que aquest és un índex indicatiu 
      que té com a objectiu que la població disposi d&apos;informació sobre l&apos;estat de la contaminació atmosfèrica.</p>
      <br />
      <p style={{ textAlign: 'justify' }}>L&apos;Índex Català de la Qualitat de l’Aire transforma la informació donada per la concentració de diferents 
      contaminants atmosfèrics, amb afectacions diferents segons els nivells d&apos;immissió, per obtenir una categoria 
      única, centrat en la qualitat de l&apos;aire que es respira i que es pot representar amb una escala de colors. 
      Per tant, l&apos;ICQA permet passar d&apos;informació altament tècnica a dades fàcilment comprensibles. La següent escala  
      ha estat adaptada a partir de l&apos;oficial, que es por obtenir a la web de <a href="https://mediambient.gencat.cat/ca/05_ambits_dactuacio/atmosfera/qualitat_de_laire/avaluacio/icqa/index.html"
        target="_blank" rel="noopener noreferrer" style={{ color: 'blue' , textDecoration: 'underline'}}>Medi Ambient de la Generalitat de Catalunya</a>:</p>
      <br />
      <br />
      <div className="flex justify-center items-center">
        <Image
          src="/PHOTO-2024-05-17-12-03-41.jpg"
          alt="Taula ICQUA"
          width={900}
          height={1100}
          className="image"
        />
      </div>
      <br />
      <br />
      <br />


    </div>
  );
};

export default HomePage;
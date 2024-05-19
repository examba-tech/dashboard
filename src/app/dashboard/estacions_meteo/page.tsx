"use client"
import React, { useState } from 'react';
import MyMapa from '../../../components/mapas/MyMapa_meteo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  const [infoExpandida, setinfoExpandida] = useState<number[]>([]);
  const toggleExpansion2 = (index: number) => {
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
        mapa que ens permet veure la localització de cadascuna d'aquestes estacions, i es pot clicar 
        per veure la informació més rellevant corresponent. Després trobem informació addicional respecte
        on s'han trobat trobat les dades, entre d&apos;altres.
        </p>
      </div>
    },
  ];

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

  const estacionesMeteorologicas = [
    { nombre: 'D3, Vallirana', info: <p></p>},
    { nombre: 'UF, Begues (PN del Garraf-El Rascler)', info: <p></p> },
    { nombre: 'UG, Viladecans', info: <p></p>},
    { nombre: 'UK, Sant Pere de Ribes - PN del Garraf ', info: <p></p>},
    { nombre: 'W4, Vilafranca del Penedès - La Granada', info: <p></p>},
    { nombre: 'XC, Castellbisbal', info: <p></p> },
    { nombre: 'XL, El Prat de Llobregat', info: <p></p>},
    { nombre: 'X8, Barcelona (Zona Universitaria)', info: <p></p> },
    { nombre: 'XU, Canyelles', info: <p> </p>},
    { nombre: 'YR, Vilanova i la Geltrú', info: <p></p>}
  ];
  return (
    <div>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Estacions Meteorològiques</h1>
        <ul style={{ marginLeft: '400px', marginTop: '-33px' }}>
        {informació.map((informació, index) => (
          <li key={index}>
            <span onClick={() => toggleExpansion2(index)}>
              <strong style={{ color: 'gray' }} >{informació.nombre}</strong>
              {infoExpandida.includes(index) ? (
                <FontAwesomeIcon icon={faChevronUp} style={{  color: 'gray', marginLeft: '5px' }} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown} style={{  color: 'gray', marginLeft: '5px' }} />
              )}
            </span>
            {infoExpandida.includes(index) && (
              <div style={{ marginLeft: '-398px', marginTop: '20px' }}>
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
      <p style={{ textAlign: 'justify' }}>Les dades diàries respecte dels diferents factors meteorològics per realitzar la 
        predicció han estat recollides gràcies a diferents peticions fetes al Servei 
        Meteorològic de Catalunya (<a href="https://www.meteo.cat/observacions/llistat-xema"
        target="_blank" rel="noopener noreferrer" style={{ color: 'blue' , textDecoration: 'underline'}}> 
        meteo.cat</a>). Les dades s&apos;han demanat tenint en compte les estacions meteorològiques
        que ens interessaven en aquest cas concret, és a dir, les que es troben en els municipis 
        que cauen dins de la Regió Metropolitana Sud. Cal destacar que els factors meteorològics
        recollits es corresponen amb aquells majoritàriament comuns a les dades recollides de totes
        les estacions considerades, i que ens semblaven rellevants en la predicció del nombre de visites:
        factors com la temperatura, la quantitat de precipitació, la irradiància solar global i la 
        humitat relativa, entre d&apos;altres.
      </p> 

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
import Image from 'next/image';

export default function About (
    { children } : { children: React.ReactNode }
)


{
    return (
        <section>

        <h2 className="text-xl font-semibold">Sobre Nosotros</h2>
        <br></br>
        <p> Cada any, 4.2 milions de persones perden la vida a causa de la contaminació de l’aire, segons l’OMS.  Més de la meitat d’aquestes morts es deuen a complicacions respiratòries. De fet, la contaminació atmosfèrica ja mata més persones que el colesterol alt o l'obesitat. Això també es reflecteix en l’àmbit econòmic, ja que segons el Banc Mundial, la contaminació atmosfèrica costa 8.1 bilions de dòlars anuals en salut, que representa un 6.1% del PIB mundial.</p>
        <br></br>
        <p>En un món cada vegada més digitalitzat, la disponibilitat de grans volums de dades i el desenvolupament de tecnologies avançades com l'aprenentatge automàtic, el big data i la intel·ligència artificial, obren noves oportunitats per abordar problemes complexos de salut pública. Aquestes eines tecnològiques permeten una gestió més eficient i precisa de les dades sanitàries i ambientals, facilitant la detecció precoç de patrons i tendències que poden ajudar els especialistes a gestionar recursos, prevenir situacions de risc i onades d’ingressos hospitalaris provocats per la contaminació. </p>        
        <br></br>
        <p>Malgrat la disponibilitat de dades i les tecnologies per processar-les, existeix una mancança significativa en l'aplicació d'aquestes eines per combatre els efectes de la contaminació de l'aire sobre la salut. La majoria de les estratègies actuals no aprofiten plenament el potencial de les dades disponibles i hi ha una falta d'integració entre les dades de qualitat de l'aire i les dades sanitàries, que limita la capacitat de prendre decisions informades per a la prevenció i gestió de les patologies respiratòries. A més, molts cops aquestes dades no es troben ben estructurades de manera que puguin ser analitzades de forma eficaç.</p>
        <br></br>
        <p>Per consegüent, el nostre projecte se centra en el desenvolupament d'una solució integral que fusiona dades ambientals amb dades sanitàries, amb el suport inicial del nostre primer client, l'Institut Català de la Salut (ICS). El nostre objectiu és crear una plataforma que no només emeti alertes de possibles futures situacions de risc en l’augment de ciutadans amb patologies respiratòries, sinó que també explori i estableixi relacions entre les patologies i la contaminació per prevenir, anticipar i reduir l'impacte de la contaminació de l'aire en les malalties respiratòries, i gestioni l’organització de recursos que suposa.</p>
        <br></br>
        <p>EXAMBA és una iniciativa que hem tirat endavant deu estudiants de la UPC especialitzats en Ciència i Enginyeria de Dades. Per a EXAMBA, el equip és un pilar fonamental; creiem fermament en la nostra iniciativa i en el seu potencial per millorar el món de la salut. Estem convençuts que, mitjançant la nostra dedicació i expertise, podem fer una diferència significativa en com s'aborden els reptes sanitaris actuals, aplicant les últimes innovacions en l'àmbit de les dades per desenvolupar solucions eficaces i eficients. </p>
        <br></br>
        <p>A continuació, presentem els deu brillants membres que formen l'equip d'EXAMBA. Cadascun d'ells aporta una riquesa única de coneixement i experiència en l'àmbit de la Ciència i Enginyeria de Dades, essent peça clau en la nostra missió de revolucionar el sector de la salut.</p>
        <br></br>
        
        <div style={{ display: 'flex' }}>
            <Image
                src = "/imagenes/albert.png"
                alt = "Albert Fugardo"
                width={500}
                height={500}
            /> 
            <Image
                src = "/imagenes/marc.png"
                alt = "Marc Franquesa"
                width={500}
                height={500}
            />   
            <Image
                src = "/imagenes/mariar.png"
                alt = "Maria Risques"
                width={500}
                height={500}
            />   
            <Image
                src = "/imagenes/mariat.png"
                alt = "Maria Tubella"
                width={500}
                height={500}
            />   
            <Image
                src = "/imagenes/mauro.png"
                alt = "Mauro Filomeno"
                width={500}
                height={500}
            />      
        </div>
        <div style={{ display: 'flex' }}>
            <Image
                src = "/imagenes/albert.png"
                alt = "Albert Fugardo"
                width={500}
                height={500}
            /> 
            <Image
                src = "/imagenes/marc.png"
                alt = "Marc Franquesa"
                width={500}
                height={500}
            />   
            <Image
                src = "/imagenes/mariar.png"
                alt = "Maria Risques"
                width={500}
                height={500}
            />   
            <Image
                src = "/imagenes/mariat.png"
                alt = "Maria Tubella"
                width={500}
                height={500}
            />   
            <Image
                src = "/imagenes/mauro.png"
                alt = "Mauro Filomeno"
                width={500}
                height={500}
            />      
        </div>
        </section>
    )
}
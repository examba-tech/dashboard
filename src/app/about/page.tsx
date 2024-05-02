import Image from "next/image";

const size = 150;

export default function About() {
  return (
    <section>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Sobre Nosaltres</h1>
      <br></br>
      <p>
        {" "}
        Cada any, 4.2 milions de persones perden la vida a causa de la
        contaminació de l&apos;aire, segons l&apos;OMS. Més de la meitat
        d&apos;aquestes morts es deuen a complicacions respiratòries. De fet, la
        contaminació atmosfèrica ja mata més persones que el colesterol alt o
        l&apos;obesitat. Això també es reflecteix en l&apos;àmbit econòmic, ja
        que segons el Banc Mundial, la contaminació atmosfèrica costa 8.1
        bilions de dòlars anuals en salut, que representa un 6.1% del PIB
        mundial.
      </p>
      <br></br>
      <p>
        En un món cada vegada més digitalitzat, la disponibilitat de grans
        volums de dades i el desenvolupament de tecnologies avançades com
        l&apos;aprenentatge automàtic, el big data i la intel·ligència
        artificial, obren noves oportunitats per abordar problemes complexos de
        salut pública. Aquestes eines tecnològiques permeten una gestió més
        eficient i precisa de les dades sanitàries i ambientals, facilitant la
        detecció precoç de patrons i tendències que poden ajudar els
        especialistes a gestionar recursos, prevenir situacions de risc i onades
        d&apos;ingressos hospitalaris provocats per la contaminació.{" "}
      </p>
      <br></br>
      <p>
        Malgrat la disponibilitat de dades i les tecnologies per processar-les,
        existeix una mancança significativa en l&apos;aplicació d&apos;aquestes
        eines per combatre els efectes de la contaminació de l&apos;aire sobre
        la salut. La majoria de les estratègies actuals no aprofiten plenament
        el potencial de les dades disponibles i hi ha una falta
        d&apos;integració entre les dades de qualitat de l&apos;aire i les dades
        sanitàries, que limita la capacitat de prendre decisions informades per
        a la prevenció i gestió de les patologies respiratòries. A més, molts
        cops aquestes dades no es troben ben estructurades de manera que puguin
        ser analitzades de forma eficaç.
      </p>
      <br></br>
      <p>
        Per consegüent, el nostre projecte se centra en el desenvolupament
        d&apos;una solució integral que fusiona dades ambientals amb dades
        sanitàries, amb el suport inicial del nostre primer client,
        l&apos;Institut Català de la Salut (ICS). El nostre objectiu és crear
        una plataforma que no només emeti alertes de possibles futures
        situacions de risc en l&apos;augment de ciutadans amb patologies
        respiratòries, sinó que també explori i estableixi relacions entre les
        patologies i la contaminació per prevenir, anticipar i reduir
        l&apos;impacte de la contaminació de l&apos;aire en les malalties
        respiratòries, i gestioni l&apos;organització de recursos que suposa.
      </p>
      <br></br>
      <p>
        EXAMBA és una iniciativa que hem tirat endavant deu estudiants de la UPC
        especialitzats en Ciència i Enginyeria de Dades. Per a EXAMBA, el equip
        és un pilar fonamental; creiem fermament en la nostra iniciativa i en el
        seu potencial per millorar el món de la salut. Estem convençuts que,
        mitjançant la nostra dedicació i expertise, podem fer una diferència
        significativa en com s&apos;aborden els reptes sanitaris actuals,
        aplicant les últimes innovacions en l&apos;àmbit de les dades per
        desenvolupar solucions eficaces i eficients.{" "}
      </p>
      <br></br>
      <p>
        A continuació, presentem els deu brillants membres que formen
        l&apos;equip d&apos;EXAMBA. Cadascun d&apos;ells aporta una riquesa
        única de coneixement i experiència en l&apos;àmbit de la Ciència i
        Enginyeria de Dades, essent peça clau en la nostra missió de
        revolucionar el sector de la salut.
      </p>
      <br></br>

      <div className="flex items-center justify-center">
        <Image
          src="/nosotros/albert.png"
          alt="Albert Fugardo"
          width={size}
          height={size}
        />
        <div style={{ marginRight: "30px" }}></div>
        <div style={{ marginBottom: "200px" }}></div>
        <Image
          src="/nosotros/marc.png"
          alt="Marc Franquesa"
          width={size}
          height={size}
        />
        <div style={{ marginRight: "30px" }}></div>
        <Image
          src="/nosotros/mariar.png"
          alt="Maria Risques"
          width={size}
          height={size}
        />
        <div style={{ marginRight: "20px" }}></div>
        <Image
          src="/nosotros/mariat.png"
          alt="Maria Tubella"
          width={size}
          height={size}
        />
        <div style={{ marginRight: "30px" }}></div>
        <Image
          src="/nosotros/mauro.png"
          alt="Mauro Filomeno"
          width={size}
          height={size}
        />
      </div>
      <div className="flex items-center justify-center">
        <Image
          src="/nosotros/Xiao.png"
          alt="Xiao Segarra"
          width={size}
          height={size}
        />
        <div style={{ marginRight: "30px" }}></div>
        <Image
          src="/nosotros/Aida.png"
          alt="Aida Torres"
          width={size}
          height={size}
        />
        <div style={{ marginRight: "30px" }}></div>
        <Image
          src="/nosotros/Blanca.png"
          alt="Blanca Unanue"
          width={size}
          height={size}
        />
        <div style={{ marginRight: "30px" }}></div>
        <Image
          src="/nosotros/Elena.png"
          alt="Elena González"
          width={size}
          height={size}
        />
        <div style={{ marginRight: "30px" }}></div>
        <Image
          src="/nosotros/Adri.png"
          alt="Adrián Cerezuela"
          width={size}
          height={size}
        />
      </div>
    </section>
  );
}

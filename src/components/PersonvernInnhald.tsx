import type { ReactNode } from "react";

/**
 * Personvernerklæringa for Selseng & Systaddal AS. Same tekst på
 * kommunalsektor.no/personvern og selsengsystaddal.no/personvern.
 * Fargane blir sende inn, så kvar merkevare beheld drakta si.
 *
 * Endrar du teksten: oppdater SIST_ENDRA og protokollen i Notion
 * («Nivå 1 · Behandlingsprotokollar»).
 */

export const SIST_ENDRA = "10. november 2026";

type Farger = {
  tekst: string;
  dempa: string;
  linje: string;
  lenkje: string;
  overskrift?: React.CSSProperties;
};

function Bolk({
  tittel,
  farger,
  children,
}: {
  tittel: string;
  farger: Farger;
  children: ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2
        className="text-2xl tracking-tight mb-4"
        style={{ color: farger.tekst, ...farger.overskrift }}
      >
        {tittel}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export default function PersonvernInnhald({
  farger,
  samtykke,
}: {
  farger: Farger;
  /** Knappane for å endre val om informasjonskapslar (berre på selsengsystaddal.no). */
  samtykke?: ReactNode;
}) {
  const a = {
    className: "underline underline-offset-4",
    style: { color: farger.lenkje },
  };
  const celle = "py-2 pr-4 align-top";
  const rad = { borderTop: `1px solid ${farger.linje}` };

  return (
    <div className="leading-[1.7] text-[17px]" style={{ color: farger.tekst }}>
      {/* Første lag: det viktigaste */}
      <div
        className="rounded-2xl p-6 sm:p-8"
        style={{ border: `1px solid ${farger.linje}` }}
      >
        <p className="font-medium mb-3">Kort fortalt</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Selseng & Systaddal AS er ansvarleg for personopplysningane me
            samlar inn på kommunalsektor.no, selsengsystaddal.no og i arbeidet
            vårt elles.
          </li>
          <li>
            Me brukar opplysningane til å svare deg, levere oppdrag, lage
            podkastar og sende nyheitsbrev du har bede om. Me sel dei ikkje.
          </li>
          <li>
            Statistikken på nettsidene brukar ingen informasjonskapslar.
            HubSpot på selsengsystaddal.no blir berre lasta om du seier ja.
          </li>
          <li>
            Du kan få innsyn, få retta eller sletta opplysningar og trekkje
            tilbake samtykke. Skriv til{" "}
            <a href="mailto:hei@selsengsystaddal.no" {...a}>
              hei@selsengsystaddal.no
            </a>
            .
          </li>
        </ul>
      </div>

      <Bolk tittel="Kven som er ansvarleg" farger={farger}>
        <p>
          Selseng & Systaddal AS, org.nr. 937 344 597, Bentsebrugata 27B, 0469
          Oslo, er behandlingsansvarleg. Helle Selseng er kontaktperson for
          personvern. Du når oss på{" "}
          <a href="mailto:hei@selsengsystaddal.no" {...a}>
            hei@selsengsystaddal.no
          </a>
          .
        </p>
        <p>
          Me har ikkje personvernombod. Lova krev det ikkje for ei verksemd som
          vår, og me har dokumentert den vurderinga.
        </p>
      </Bolk>

      <Bolk tittel="Kva me behandlar, og kvifor" farger={farger}>
        <h3 className="font-medium mt-2">Når du tek kontakt med oss</h3>
        <p>
          Skriv du til oss i skjemaet, på e-post eller bookar ein prat, får me
          namnet ditt, e-postadressa, eventuelt telefonnummer og det du skriv.
          Me brukar det til å svare deg og følgje opp samtalen. Grunnlaget er
          vår berettiga interesse i å svare på førespurnader, eller at du ber
          om eit tilbod (personvernforordninga artikkel 6 nr. 1 bokstav f og
          b). Me slettar opplysningane to år etter siste kontakt, med mindre
          du blir kunde.
        </p>

        <h3 className="font-medium mt-6">Kundar og samarbeidspartnarar</h3>
        <p>
          For kontaktpersonar hos kundar og partnarar lagrar me namn, rolle,
          kontaktinformasjon og dialogen med oss. Grunnlaget er avtalen og vår
          berettiga interesse i å følgje opp kundeforholdet. Me slettar
          opplysningane tre år etter at kundeforholdet er slutt. Fakturaer og
          bilag tek me vare på i fem år etter utgangen av rekneskapsåret, fordi
          bokføringslova krev det.
        </p>

        <h3 className="font-medium mt-6">Arbeidsrom for kundane våre</h3>
        <p>
          I Kunderommet og andre arbeidsrom behandlar me opplysningar på vegner
          av kunden. Då er kunden behandlingsansvarleg, og me er databehandlar
          etter ein databehandlaravtale. Har du spørsmål om opplysningar der,
          kan du kontakte arbeidsgjevaren din eller oss.
        </p>

        <h3 className="font-medium mt-6">Podkastar og gjestar</h3>
        <p>
          Er du gjest i ein av podkastane våre, behandlar me namn, rolle,
          stemme, eventuelt bilete og video, og korrespondansen med deg. Me
          førebur samtalen ut frå det du og organisasjonen din har gjort
          offentleg. Grunnlaget er avtalen med deg om å vere med, og du
          godkjenner episoden før den blir publisert. Publiserte episodar ligg
          ute så lenge podkasten finst. Råopptak og førebuinga slettar me tolv
          månader etter at episoden er publisert.
        </p>

        <h3 className="font-medium mt-6">Nyheitsbrev og fellesskapet Handlingsrommet</h3>
        <p>
          Melder du deg på nyheitsbrevet eller fellesskapet Handlingsrommet,
          behandlar me e-postadressa og namnet ditt fordi du har samtykt. Du
          kan melde deg av når du vil, med lenkja i kvar e-post eller ved å
          skrive til oss.
        </p>

        <h3 className="font-medium mt-6">Besøk på nettsidene</h3>
        <p>
          Me tel besøk med ein eigen teljar som ikkje lagrar noko i nettlesaren
          din. Han sender kva side du ser på og kva side du kom frå. Vercel Web
          Analytics gir oss same slags samla tal, òg utan informasjonskapslar.
          Grunnlaget er vår berettiga interesse i å vite kva innhald som blir
          lese. Me brukar tala berre samla.
        </p>
      </Bolk>

      <Bolk tittel="Informasjonskapslar" farger={farger}>
        <p>
          kommunalsektor.no brukar ingen informasjonskapslar som krev
          samtykke. På selsengsystaddal.no spør me før me lastar HubSpot, som
          hjelper oss å forstå korleis sida blir brukt og å kople besøk til
          førespurnader du sjølv sender oss.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-[15px]">
            <thead>
              <tr className="text-left" style={{ color: farger.dempa }}>
                <th className={celle}>Namn</th>
                <th className={celle}>Kven</th>
                <th className={celle}>Kva den gjer</th>
                <th className={celle}>Varer</th>
              </tr>
            </thead>
            <tbody>
              <tr style={rad}>
                <td className={celle}>ss-consent</td>
                <td className={celle}>Selseng & Systaddal</td>
                <td className={celle}>
                  Hugsar valet ditt om informasjonskapslar. Lagra i
                  nettlesaren, nødvendig.
                </td>
                <td className={celle}>Til du slettar den</td>
              </tr>
              <tr style={rad}>
                <td className={celle}>__hstc, hubspotutk</td>
                <td className={celle}>HubSpot</td>
                <td className={celle}>
                  Kjenner att nettlesaren din mellom besøk. Berre med samtykke.
                </td>
                <td className={celle}>6 månader</td>
              </tr>
              <tr style={rad}>
                <td className={celle}>__hssc, __hssrc</td>
                <td className={celle}>HubSpot</td>
                <td className={celle}>
                  Held styr på økta. Berre med samtykke.
                </td>
                <td className={celle}>30 minutt / økta</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Opnar du kalenderen for å booke ein prat, blir den henta frå HubSpot,
          og HubSpot kan då setje informasjonskapslar for sjølve bookinga.
        </p>
        {samtykke}
      </Bolk>

      <Bolk tittel="Kven me deler opplysningane med" farger={farger}>
        <p>
          Me deler ikkje opplysningane dine med andre enn leverandørane som
          hjelper oss å drive. Dei er databehandlarane våre og kan berre bruke
          opplysningane slik me har avtalt.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Microsoft 365: e-post og filer, lagra i Noreg eller EU</li>
          <li>HubSpot: kundeoversikt, kontaktskjema og booking, lagra i EU</li>
          <li>Formspree: kontaktskjemaet på kommunalsektor.no</li>
          <li>Supabase: databasen for arbeidsromma, lagra i Stockholm</li>
          <li>Vercel: drift av nettsidene og arbeidsromma</li>
          <li>Notion og Slack: interne notat, oppgåver og varsel</li>
          <li>Resend: e-post som arbeidsromma sender</li>
          <li>Riverside: opptak og redigering av podkastar</li>
          <li>Anthropic (Claude) og OpenAI (ChatGPT): KI-verktøy med databehandlaravtale, utan trening på dataa våre</li>
          <li>Sanity: innhaldet på nettsidene</li>
          <li>Substack og Circle: nyheitsbrev og fellesskapet Handlingsrommet</li>
          <li>Fiken: rekneskap</li>
        </ul>
        <p>
          Nokre av leverandørane har selskap i USA. Når opplysningar blir
          behandla utanfor EU og EØS, skjer det etter EU sine
          standardkontraktar (SCC) eller EU–US Data Privacy Framework.
        </p>
      </Bolk>

      <Bolk tittel="Rettane dine" farger={farger}>
        <p>Du har rett til å</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>få vite kva me har om deg, og få ein kopi</li>
          <li>få retta feil</li>
          <li>få sletta opplysningar som me ikkje lenger treng eller må ta vare på</li>
          <li>få avgrensa bruken eller seie nei til bruk som byggjer på berettiga interesse</li>
          <li>få opplysningane du har gitt oss, i eit format du kan ta med deg</li>
          <li>trekkje tilbake eit samtykke når som helst</li>
        </ul>
        <p>
          Skriv til{" "}
          <a href="mailto:hei@selsengsystaddal.no" {...a}>
            hei@selsengsystaddal.no
          </a>
          . Me svarar innan éin månad. Meiner du at me ikkje følgjer reglane,
          kan du klage til{" "}
          <a href="https://www.datatilsynet.no" {...a}>
            Datatilsynet
          </a>
          .
        </p>
      </Bolk>

      <Bolk tittel="Endringar" farger={farger}>
        <p>
          Me oppdaterer erklæringa når me endrar korleis me behandlar
          opplysningar. Sist endra {SIST_ENDRA}.
        </p>
      </Bolk>
    </div>
  );
}

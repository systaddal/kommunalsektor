import SSLenke from "./SSLenke";
import SSSynleg from "./SSSynleg";

export type ModellTema = {
  _id: string;
  tittel: string;
  slug: { current: string };
  posisjon?: "topp" | "venstre" | "hogre" | "botn";
};

// Modellen: dei fire områda stilte opp som krysset i symbolet, med kjernen
// i midten. Kvart område lenkjer til si eiga side. Når modellen kjem til
// syne, glir områda inn mot kjernen.
export default function SSModell({
  tema,
  kjerne,
}: {
  tema: ModellTema[];
  kjerne: string;
}) {
  const plasserte = tema.filter((t) => t.posisjon);
  if (plasserte.length === 0) return null;

  return (
    <SSSynleg className="ss-modell">
      {plasserte.map((t) => (
        <SSLenke
          key={t._id}
          href={`/ss/tema/${t.slug.current}`}
          className={`ss-modell__del ss-modell__del--${t.posisjon}`}
        >
          <span>{t.tittel}</span>
        </SSLenke>
      ))}
      <div className="ss-modell__kjerne">
        <span>{kjerne}</span>
      </div>
    </SSSynleg>
  );
}

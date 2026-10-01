import Script from "next/script";

// Mesure d'audience, activée uniquement si l'identifiant est présent en
// environnement. Tant que NEXT_PUBLIC_GA_ID n'est pas défini, rien n'est chargé
// et aucune requête tierce ne part : le site reste identique pour le visiteur.
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}

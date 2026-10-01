import Script from "next/script";

// L'identifiant de mesure GA4 n'est pas un secret : il est visible dans le HTML
// de chaque page. On le code en valeur par defaut pour ne pas dependre d'une
// variable d'environnement a poser sur l'hebergeur, tout en laissant la
// possibilite de le surcharger.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-7VP6557ZL4";

// Mode Consentement, tout refuse par defaut. Le site n'a pas de banniere, donc
// rien ne pourrait recueillir un consentement a transmettre. GA4 bascule alors
// en mesure sans cookie : on garde les pages vues, les sources et les pays,
// on perd l'identification des visiteurs qui reviennent. C'est le bon compromis
// pour un portfolio consulte depuis l'EEE.
//
// Si une banniere est ajoutee un jour, il suffira d'appeler
// gtag('consent','update',{analytics_storage:'granted'}) a l'acceptation.
const CONSENT = [
  "gtag('consent','default',{",
  "ad_storage:'denied',",
  "ad_user_data:'denied',",
  "ad_personalization:'denied',",
  "analytics_storage:'denied'",
  "});",
].join("");

export function Analytics() {
  // Rien en developpement : sinon chaque npm run dev gonfle les statistiques.
  if (!GA_ID || process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}${CONSENT}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}

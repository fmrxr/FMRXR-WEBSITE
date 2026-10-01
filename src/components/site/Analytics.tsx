import Script from "next/script";

// L'identifiant de mesure GA4 n'est pas un secret : il est visible dans le HTML
// de chaque page. On le code en valeur par defaut pour ne pas dependre d'une
// variable d'environnement a poser sur l'hebergeur, tout en laissant la
// possibilite de le surcharger.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-7VP6557ZL4";

export function Analytics() {
  // Rien en developpement : sinon chaque npm run dev gonfle les statistiques.
  if (!GA_ID || process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}

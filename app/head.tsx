export default function Head() {
  const siteUrl = "https://arvea.vercel.app"
  const title = "ARVEA — produits naturels | Boutique officielle"
  const description =
    "ARVEA – Boutique officielle produits naturels. Achetez nos produits ARVEA authentiques. Support via WhatsApp & Instagram."
  const image = `${siteUrl}/og-image.jpg` // replace with real OG image path

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="ARVEA, produits ARVEA, produits naturels, boutique ARVEA" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={siteUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="ARVEA" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={siteUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* hreflang (Arabic, French, English) */}
      <link rel="alternate" href={`${siteUrl}/ar`} hreflang="ar" />
      <link rel="alternate" href={`${siteUrl}/fr`} hreflang="fr" />
      <link rel="alternate" href={`${siteUrl}/en`} hreflang="en" />
      <link rel="alternate" href={`${siteUrl}`} hreflang="x-default" />

      {/* JSON-LD Store */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "ARVEA",
            url: siteUrl,
            logo: `${siteUrl}/logo.svg`,
            sameAs: ["https://www.instagram.com/arvea76572/"],
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: " +213660839370",
                contactType: "customer service",
                areaServed: "DZ",
              },
            ],
          }),
        }}
      />
    </>
  )
}



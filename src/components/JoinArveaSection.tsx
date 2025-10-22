"use client"

import { useState } from "react"

type LanguageCode = "ar" | "fr" | "en"

const messages: Record<LanguageCode, { title: string; body: string; dir?: "rtl" | "ltr" }> = {
  ar: {
    title: "انضم إلى ARVEA",
    body:
      "هل ترغب في تحسين دخلك وكسب المال من المنزل؟ نحن فريق متخصص في بيع منتجات ARVEA المميزة ونساعد أي شخص مهتم أن يبدأ عمله الخاص بسهولة. إذا أردت الانضمام إلينا وتحقيق أرباحك الخاصة، تواصل معنا الآن!",
    dir: "rtl",
  },
  fr: {
    title: "Rejoindre ARVEA",
    body:
      "Souhaitez-vous améliorer vos revenus et gagner de l'argent depuis chez vous ? Nous sommes une équipe spécialisée dans la vente des produits ARVEA et nous aidons toute personne intéressée à démarrer son propre business facilement. Contactez-nous pour rejoindre notre équipe !",
  },
  en: {
    title: "Join ARVEA",
    body:
      "Would you like to improve your income and earn money from home? We are a team specialized in selling ARVEA products and we help anyone interested start their own business easily. Contact us now to join our team!",
  },
}

const instagramUrl = "https://www.instagram.com/areva.cosmetics/"
const whatsappUrl = "https://wa.me/213660839370"

export default function JoinArveaSection() {
  const [lang, setLang] = useState<LanguageCode>("fr")
  const content = messages[lang]

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-border flex items-center justify-center gap-2 sm:gap-4">
            <button
              type="button"
              onClick={() => setLang("ar")}
              className={`px-3 py-1.5 text-sm sm:text-base rounded-full transition-colors ${
                lang === "ar" ? "bg-primary text-primary-foreground shadow" : "bg-muted hover:bg-muted/70"
              }`}
            >
              عربي
            </button>
            <span className="text-muted-foreground">|</span>
            <button
              type="button"
              onClick={() => setLang("fr")}
              className={`px-3 py-1.5 text-sm sm:text-base rounded-full transition-colors ${
                lang === "fr" ? "bg-primary text-primary-foreground shadow" : "bg-muted hover:bg-muted/70"
              }`}
            >
              Français
            </button>
            <span className="text-muted-foreground">|</span>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 text-sm sm:text-base rounded-full transition-colors ${
                lang === "en" ? "bg-primary text-primary-foreground shadow" : "bg-muted hover:bg-muted/70"
              }`}
            >
              English
            </button>
          </div>

          <div className="p-6 sm:p-8">
            <div dir={content.dir || "ltr"} className={content.dir === "rtl" ? "text-right" : "text-left"}>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{content.title}</h3>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{content.body}</p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-3 shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30 transition"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm11 1a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
                </svg>
                Instagram
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-green-600 hover:bg-green-700 text-white px-5 py-3 shadow-lg shadow-green-600/20 hover:shadow-green-600/30 transition"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.051 2C6.477 2 2 6.477 2 12.051c0 1.776.463 3.507 1.34 5.037L2 22l5.028-1.312a10.03 10.03 0 004.99 1.313h.033c5.574 0 10.051-4.477 10.051-10.051C22.102 6.477 17.625 2 12.051 2z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



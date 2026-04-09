import deBase from "./translations/de.json"
import enBase from "./translations/en.json"

import reflectors from "../images/reflectors.jpg"
import morgenpostLogo from "../images/Berlinermorgenpostlogo(1).jpg"
import tagesanzeigerLogo from "../images/tages-anzeiger.jpg"
import eonLogo from "../images/EON_Logo.svg(1).png"
import spiegelLogo from "../images/2000px-Spiegel-Online-Logo.svg.png"
import mattLogo from "../images/matt(1).png"
import insightsLogo from "../images/Screenshot 2026-01-01 203952(1).png"
import theaterMain from "../images/optimized/theater-1600.webp"
import theaterTwo from "../images/optimized/theater-2-1100.webp"
import theaterTwoNew from "../images/optimized/theater-2-neu.webp"
import theaterThree from "../images/optimized/theater-3-1100.webp"
import improPdfDe from "../images/Portfolio Impro .pdf"
import improPdfEn from "../images/Portfolio Impro (Englisch).pdf"

const writingWorkItems = [
  {
    title: "Schmerz-Studie\nüberrascht",
    href: "https://www.morgenpost.de/ratgeber-wissen/article408336511/natuerliche-alternative-zu-ibu-co-schmerz-studie-ueberrascht.html",
    iconColor: "var(--brand-lilac)",
    logo: {
      src: morgenpostLogo,
      alt: "Berliner Morgenpost",
      className: "isMorgenpost"
    }
  },
  {
    title: "Biomasse als\nAlleskönner",
    href: "https://unternehmen.tagesanzeiger.ch/energie/wie-funktioniert-biomasse-als-energielieferant",
    iconColor: "rgba(0,0,0,0.92)",
    logo: {
      src: tagesanzeigerLogo,
      alt: "Tages-Anzeiger",
      className: "isTages"
    }
  },
  {
    title: "UX Writing for the\nE.ON\nWebsite",
    href: "https://www.eon.de/de/pk/hems/comfort-sichern.html?utm_source=google&utm_medium=cpc&utm_campaign=SEA_SMARTHOME_PK_PERF_COMFLEX_EWK_25&mc=0512412001&gad_source=1&gad_campaignid=22896047259&gbraid=0AAAABAqNVExau53NhcySJiDvxDVVoyj9x&gclid=Cj0KCQiA9t3KBhCQARIsAJOcR7zAp-R8EbFZQiAKRreUt3kAIlo8r_DBsiow7IlS2IlY1GFeIIFO1xYaAmZsEALw_wcB",
    iconColor: "var(--brand-lilac)",
    logo: { src: eonLogo, alt: "E.ON", className: "isSmall" }
  },
  {
    title: "Einzelgänger nach\nCorona Isolation?",
    href: "https://www.spiegel.de/psychologie/coronakrise-kann-man-das-sozialleben-verlernen-a-586c3302-0a91-4063-b528-f34629f7aca0",
    iconColor: "rgba(0,0,0,0.92)",
    logo: { src: spiegelLogo, alt: "SPIEGEL ONLINE", className: "" }
  }
]

const writingBottomLogos = [
  {
    href: "https://matt.de/",
    ariaLabel: "MATT",
    src: mattLogo,
    alt: "MATT",
    className: "isMatt",
    wrapperClassName: "bottomLogoMatt"
  },
  {
    href: "https://www.insights.com/de/",
    ariaLabel: "insights",
    src: insightsLogo,
    alt: "insights",
    className: "isInsights",
    wrapperClassName: "bottomLogoInsights"
  }
]

const improWorkItemsByLocale = {
  de: [
    {
      title: "Impro Portfolio\n(PDF DE)",
      href: improPdfDe,
      iconColor: "var(--brand-lilac)",
      logo: { src: theaterMain, alt: "Impro Portfolio", className: "" }
    },
    {
      title: "Impro Portfolio\n(PDF EN)",
      href: improPdfEn,
      iconColor: "rgba(0,0,0,0.92)",
      logo: { src: theaterTwo, alt: "Impro Portfolio EN", className: "" }
    },
    {
      title: "Buehnenfoto\nSerie 1",
      href: theaterTwoNew,
      iconColor: "var(--brand-lilac)",
      logo: { src: theaterTwoNew, alt: "Buehnenfoto 1", className: "" }
    },
    {
      title: "Buehnenfoto\nSerie 2",
      href: theaterThree,
      iconColor: "rgba(0,0,0,0.92)",
      logo: { src: theaterThree, alt: "Buehnenfoto 2", className: "" }
    }
  ],
  en: [
    {
      title: "Impro Portfolio\n(PDF EN)",
      href: improPdfEn,
      iconColor: "var(--brand-lilac)",
      logo: { src: theaterMain, alt: "Impro Portfolio", className: "" }
    },
    {
      title: "Impro Portfolio\n(PDF DE)",
      href: improPdfDe,
      iconColor: "rgba(0,0,0,0.92)",
      logo: { src: theaterTwo, alt: "Impro Portfolio DE", className: "" }
    },
    {
      title: "Stage Photo\nSeries 1",
      href: theaterTwoNew,
      iconColor: "var(--brand-lilac)",
      logo: { src: theaterTwoNew, alt: "Stage photo 1", className: "" }
    },
    {
      title: "Stage Photo\nSeries 2",
      href: theaterThree,
      iconColor: "rgba(0,0,0,0.92)",
      logo: { src: theaterThree, alt: "Stage photo 2", className: "" }
    }
  ]
}

const writingSwitchByLocale = {
  de: {
    label: "Portfolio umschalten",
    writing: "Schreiben",
    impro: "Impro Theater"
  },
  en: {
    label: "Switch portfolio",
    writing: "Writing",
    impro: "Impro Theater"
  }
}

const improByLocale = {
  de: {
    meta: {
      landingTitle: "Amonat | Impro Theater",
      aboutTitle: "Über mich",
      workTitle: "Impro Kurse",
      educationTitle: "Ausbildung",
      basePath: "/impro",
      locale: "de"
    },
    nav: {
      about: "Über mich",
      work: "Impro Kurse",
      education: "",
      paths: { about: "/ueber-mich", work: "/impro-kurse" }
    },
    hero: {
      title: "Impro Theater",
      taglineLines: ["Teambuilding, Spontanität", "& Perspektivwechsel"]
    },
    contact: {
      title: "Kontakt",
      name: "Amonat",
      email: "amonatwriting@gmail.com"
    },
    about: {
      title: "Über mich",
      layout: "backdrop",
      image: {
        src: theaterThree,
        alt: ""
      },
      paragraphs: [
        [
          {
            text: "Ich verbinde zwei Welten: Die ",
            highlight: false
          },
          {
            text: "Kombination aus über 20 Jahren Theater- und Filmerfahrung",
            highlight: true
          },
          {
            text: " und ",
            highlight: false
          },
          {
            text: "psychotherapeutischem Fachwissen",
            highlight: true
          },
          {
            text: ", durch meine Ausbildung als Heilpraktikerin für Psychotherapie und meine Weiterbildung in Gestalttherapie, prägt meinen Blick auf Menschen und Gruppen.",
            highlight: false
          }
        ],
        [
          {
            text: "Seit 9 Jahren liegt mein Schwerpunkt auf ",
            highlight: false
          },
          {
            text: "Impro Theater",
            highlight: true
          },
          {
            text: ". Aus einer anfänglichen Neugier ist eine große Leidenschaft geworden, aus der sich mein eigener Stil entwickelt hat.",
            highlight: false
          }
        ],
        [
          {
            text: "Inzwischen gebe ich regelmäßige Impro-Workshops und begleite Gruppen dabei, Spielfreude, Präsenz und Mut zum Ausprobieren zu entdecken, mit Humor, Achtsamkeit und psychologischem Verständnis, das sich direkt auf ",
            highlight: false
          },
          {
            text: "Alltag und Arbeitsalltag übertragen lässt",
            highlight: true
          },
          {
            text: ".",
            highlight: false
          }
        ]
      ]
    },
    work: {
      title: "Impro Kurse",
      layout: "split",
      image: {
        src: theaterTwoNew,
        alt: ""
      },
      paragraphs: [
        [
          {
            text: "In Zeiten von KI und ständiger Erreichbarkeit wird es immer wichtiger, den Fokus bewusst auf ",
            highlight: false
          },
          {
            text: "das Menschliche und das Miteinander zu legen",
            highlight: true
          },
          {
            text: ", am besten in einem Rahmen, der komplett offline ist. Genau solche Räume eröffnen meine Improvisationstheater-Workshops als Teambuilding oder Gruppenevents für Unternehmen und Privatpersonen.",
            highlight: false
          }
        ],
        [
          {
            text: "Sind Sie auf der Suche nach einem Event, das begeistert, verbindet und noch lange in Erinnerung bleibt? Dann könnte ein ",
            highlight: false
          },
          {
            text: "Improvisationstheater-Workshop",
            highlight: true
          },
          {
            text: " genau das Richtige sein. Die Kurse schaffen Leichtigkeit und fördern den Mut zum Ausprobieren und zu Spontanität.",
            highlight: false
          }
        ],
        [
          {
            text: "Die Teilnehmenden erleben außerdem, wie \"Scheitern als Chance\" gelingen kann und wie sich durch gemeinsames Spiel Agilität, Vertrauen und Miteinander im Alltag deutlich verbessern lassen.",
            highlight: false
          }
        ]
      ],
      items: improWorkItemsByLocale.de,
      bottomLogos: []
    },
    disclaimer: "Alle Rechte vorbehalten Amonat 2026",
    education: {
      title: "Meine Ausbildung",
      training: [
        {
          institution: "Theater- und Filmerfahrung",
          details: [
            "Mehr als 20 Jahre Erfahrung auf der Buehne und vor der Kamera"
          ]
        },
        {
          institution: "Psychotherapeutischer Hintergrund",
          details: [
            "Heilpraktikerin für Psychotherapie",
            "Weiterbildung in Gestalttherapie"
          ]
        },
        {
          institution: "Improvisationstheater Fokus",
          details: [
            "Seit 9 Jahren Schwerpunkt auf Improvisationstheater",
            "Regelmaessige Impro-Workshops für Gruppen und Teams"
          ]
        }
      ],
      footer: {
        title: "Ansatz",
        description:
          "Humor, Achtsamkeit und psychologisches Verständnis mit direktem Transfer in Alltag und Arbeitsalltag."
      }
    },
    portfolioSwitch: writingSwitchByLocale.de
  },
  en: {
    meta: {
      landingTitle: "Amonat | Impro Theater",
      aboutTitle: "About Me",
      workTitle: "Impro Classes",
      educationTitle: "Education",
      basePath: "/en/impro",
      locale: "en"
    },
    nav: {
      about: "About Me",
      work: "Impro Classes",
      education: "",
      paths: { about: "/about", work: "/work-samples" }
    },
    hero: {
      title: "Improvisational Theater",
      taglineLines: ["Team Cohesion, Spontaneity,", "New Perspectives"]
    },
    contact: {
      title: "Contact",
      name: "Amonat",
      email: "amonatwriting@gmail.com"
    },
    about: {
      title: "About Me",
      layout: "backdrop",
      image: {
        src: theaterThree,
        alt: ""
      },
      paragraphs: [
        [
          {
            text: "I integrate two realms: The ",
            highlight: false
          },
          {
            text: "fusion of over 20 years of experience in theater and film",
            highlight: true
          },
          {
            text: " with ",
            highlight: false
          },
          {
            text: "psychotherapeutic expertise",
            highlight: true
          },
          {
            text: ", derived from my training as a Heilpraktiker für Psychotherapie and my advanced studies in Gestalt therapy, informs my perspective on individuals and groups.",
            highlight: false
          }
        ],
        [
          {
            text: "For the past nine years, I have concentrated on ",
            highlight: false
          },
          {
            text: "improvisational theatre",
            highlight: true
          },
          {
            text: ". What started as curiosity has evolved into a profound passion, from which my unique style has emerged.",
            highlight: false
          }
        ],
        [
          {
            text: "I now conduct regular improv workshops and facilitate groups in exploring the joy of play, presence, and the courage to experiment, incorporating humor, mindfulness, and psychological insights that can be directly applied to ",
            highlight: false
          },
          {
            text: "daily life and work",
            highlight: true
          },
          {
            text: ".",
            highlight: false
          }
        ]
      ]
    },
    work: {
      title: "Impro Classes",
      layout: "split",
      image: {
        src: theaterTwoNew,
        alt: ""
      },
      paragraphs: [
        [
          {
            text: "In an era characterized by artificial intelligence and perpetual connectivity, it is increasingly essential to deliberately emphasize ",
            highlight: false
          },
          {
            text: "the human element and meaningful interaction",
            highlight: true
          },
          {
            text: ", preferably in a wholly offline environment. My Improvisational Theater workshops, tailored as team-building or group activities for organizations and individuals, cultivate precisely these spaces.",
            highlight: false
          }
        ],
        [
          {
            text: "Are you seeking an event that inspires, connects individuals, and creates a lasting impact? An ",
            highlight: false
          },
          {
            text: "Improvisational Theater workshop",
            highlight: true
          },
          {
            text: " may be precisely what you need. These courses cultivate a sense of ease and promote the courage to experiment and embrace spontaneity.",
            highlight: false
          }
        ],
        [
          {
            text: "Participants also discover how failure can become an opportunity, and how collaborative play can markedly strengthen agility, trust, and cooperation in everyday life.",
            highlight: false
          }
        ]
      ],
      items: improWorkItemsByLocale.en,
      bottomLogos: []
    },
    disclaimer: "All rights reserved Amonat 2026",
    education: {
      title: "Training",
      training: [
        {
          institution: "Theater and Film Experience",
          details: [
            "More than 20 years of stage and camera experience"
          ]
        },
        {
          institution: "Psychotherapeutic Background",
          details: [
            "Training as Heilpraktiker für Psychotherapie",
            "Advanced studies in Gestalt therapy"
          ]
        },
        {
          institution: "Improvisational Theater Focus",
          details: [
            "Nine years of focus on improvisational theater",
            "Regular improv workshops for teams and groups"
          ]
        }
      ],
      footer: {
        title: "Approach",
        description:
          "Humor, mindfulness, and psychological insight with direct transfer to daily life and work."
      }
    },
    portfolioSwitch: writingSwitchByLocale.en
  }
}

const writingByLocale = {
  de: {
    ...deBase,
    meta: {
      ...deBase.meta,
      basePath: "/schreiben",
      locale: "de"
    },
    nav: {
      ...deBase.nav,
      paths: { about: "/ueber-mich", work: "/arbeitsproben", education: "/ausbildung" }
    },
    about: {
      ...deBase.about,
      image: {
        src: reflectors,
        alt: ""
      }
    },
    work: {
      ...deBase.work,
      items: writingWorkItems,
      bottomLogos: writingBottomLogos
    },
    portfolioSwitch: writingSwitchByLocale.de
  },
  en: {
    ...enBase,
    meta: {
      ...enBase.meta,
      basePath: "/en/writing",
      locale: "en"
    },
    nav: {
      ...enBase.nav,
      paths: { about: "/about", work: "/work-samples", education: "/education" }
    },
    about: {
      ...enBase.about,
      image: {
        src: reflectors,
        alt: ""
      }
    },
    work: {
      ...enBase.work,
      items: writingWorkItems,
      bottomLogos: writingBottomLogos
    },
    portfolioSwitch: writingSwitchByLocale.en
  }
}

const CONTENT = {
  de: {
    writing: writingByLocale.de,
    impro: improByLocale.de
  },
  en: {
    writing: writingByLocale.en,
    impro: improByLocale.en
  }
}

const normalizeLocale = (value) => (value === "en" ? "en" : "de")
const normalizeVariant = (value) => (value === "impro" ? "impro" : "writing")

export function resolvePortfolioContent(locale, variant) {
  const localeKey = normalizeLocale(locale)
  const variantKey = normalizeVariant(variant)
  return CONTENT[localeKey][variantKey]
}

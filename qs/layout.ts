import type {
  LayoutQueryOptions,
  MenuQueryOptions,
  TranslationsQueryOptions,
} from "../interfaces/qs/layout";

export const layoutQs = (): LayoutQueryOptions => ({
  fields: [
    "legalText",
    "footerContent",
    "cookiesHeaderText",
    "cookiesDescription",
    "cookiesUrl",
    "cookiesLinkText",
  ],
  populate: {
    footerImages: {
      fields: ["imageName", "imageLink"],
      populate: {
        image: {
          fields: ["url", "width", "height"],
        },
      },
    },
    plus18Popup: {
      fields: ["activate", "title", "message", "buttonText"],
      populate: {
        image: {
          fields: ["url", "width", "height"],
        },
      },
    },
    adPopus: {
      fields: ["title", "description", "frequency"],
      populate: {
        casinos: {
          populate: {
            noDepositSection: {
              fields: ["bonusAmount", "termsConditions"],
            },
            freeSpinsSection: {
              fields: ["bonusAmount", "termsConditions"],
            },
            bonusSection: {
              fields: [
                "bonusAmount",
                "termsConditions",
                "cashBack",
                "freeSpin",
              ],
            },
            casinoBonus: true,
            termsAndConditions: true,
            images: {
              fields: ["url", "alternativeText"],
            },
            providers: {
              populate: {
                images: {
                  fields: ["url"],
                },
              },
            },
          },
        },
      },
    },
    Logo: {
      fields: ["url", "width", "height"],
    },
    homeBreadcrumbs: {
      fields: ["breadCrumbText", "breadCrumbUrl"],
    },
    gamesBreadcrumbs: {
      fields: ["breadCrumbText", "breadCrumbUrl"],
    },
    casinoBreadcrumbs: {
      fields: ["breadCrumbText", "breadCrumbUrl"],
    },
    blogBreadcrumbs: {
      fields: ["breadCrumbText", "breadCrumbUrl"],
    },
    slotCasinosBreadcrumbs: {
      fields: ["breadCrumbText", "breadCrumbUrl"],
    },
    providersBreadcrumbs: {
      fields: ["breadCrumbText", "breadCrumbUrl"],
    },
    categoriesBreadcrumbs: {
      fields: ["breadCrumbText", "breadCrumbUrl"],
    },
    casinoProvidersBreadcrumbs: {
      fields: ["breadCrumbText", "breadCrumbUrl"],
    },
    most_loved_casinos: {
      fields: ["slug", "title"],
      populate: {
        logoIcon: {
          fields: ["url"],
        },
        bonusSection: true,
      },
    },
    no_deposit_casinos: {
      fields: ["slug", "title"],
      populate: {
        logoIcon: {
          fields: ["url"],
        },
        noDepositSection: true,
      },
    },
    free_spin_casinos: {
      fields: ["slug", "title"],
      populate: {
        logoIcon: {
          fields: ["url"],
        },
        freeSpinsSection: true,
      },
    },
    backgroundImage: {
      fields: ["url"],
    },
  },
});

export const filterProviders = () => ({
  fields: ["id"],
  populate: {
    filterProviders: {
      fields: ["slug"],
      populate: {
        images: {
          fields: ["url"],
        },
      },
    },
  },
});

export const menuQs = (): MenuQueryOptions => ({
  fields: ["title"],
  populate: {
    items: {
      fields: ["title", "url", "order"],
      populate: {
        images: {
          fields: ["url"],
        },
        children: {
          fields: ["title"],
        },
      },
    },
  },
  pagination: {
    page: 1,
    pageSize: 20,
  },
});

export const translationsQs = (): TranslationsQueryOptions => ({
  populate: {
    translation: "*",
  },
});

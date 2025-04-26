export const providerGamesQs = (
  slug: string | undefined,
  casinoCountry: string = "",
  localisation: boolean = false
) => ({
  fields: ["title", "heading", "slug"],
  populate: {
    provider: {
      fields: ["title", "slug"],
      populate: {
        images: {
          fields: ["url"],
        },
        games: {
          fields: ["title", "slug", "ratingAvg", "ratingCount", "publishedAt"],
          populate: {
            provider: {
              fields: ["title", "slug"],
            },
            images: {
              fields: ["url"],
            },
          },
          sort: "ratingAvg:desc",
          // pagination: {
          //   page: 1,
          //   pageSize: 10,
          // },
        },
        relatedCasinos: {
          fields: ["title", "slug", "ratingAvg", "ratingCount"],
          populate: {
            images: {
              fields: ["url"],
            },
            casinoBonus: {
              fields: ["bonusUrl", "bonusLabel", "bonusCode"],
            },
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
            termsAndConditions: {
              fields: ["copy", "gambleResponsibly"],
            },
          },
          filters: {
            ...(localisation &&
              casinoCountry && {
                countries: {
                  shortCode: {
                    $in: casinoCountry,
                  },
                },
              }),
          },
        },
      },
    },
  },
  filters: {
    slug: {
      $eq: slug,
    },
  },
});

export const providercasinoQs = (
  slug: string | undefined,
  casinoCountry: string = ""
) => ({
  fields: ["title", "slug", "createdAt", "updatedAt"],
  populate: {
    casinoLists: {
      fields: [
        "title",
        "slug",
        "playthrough",
        "ratingAvg",
        "ratingCount",
        "authorRatings",
        "publishedAt",
      ],
      populate: {
        noDepositSection: {
          fields: ["bonusAmount", "termsConditions"],
        },
        countries: {
          fields: ["countryName", "shortCode"],
        },
        freeSpinsSection: {
          fields: ["bonusAmount", "termsConditions"],
        },
        bonusSection: {
          fields: ["bonusAmount", "termsConditions", "cashBack", "freeSpin"],
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
      filters: {
        ...(casinoCountry && {
          countries: {
            shortCode: {
              $in: casinoCountry,
            },
          },
        }),
      },
    },
  },
  filters: {
    slug: {
      $eq: slug,
    },
  },
});

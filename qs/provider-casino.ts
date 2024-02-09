export const providercasinoQs = (slug: string | undefined) => ({
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
    },
  },
  filters: {
    slug: {
      $eq: slug,
    },
  },
});

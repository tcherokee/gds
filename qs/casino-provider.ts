export const casinoproviderQs = (slug:string) => ({
  fields: [
    "title",
    "content1",
    "content2",
    "content3",
    "slug",
    "createdAt",
    "updatedAt",
  ],
  populate: {
    seo: {
      fields: ["metaTitle", "metaDescription"],
    },
    IntroductionWithImage: {
      fields: ["heading", "introduction"],
      populate: {
        image: {
          fields: ["url", "mime"],
        },
      },
    },
    faqs: {
      fields: ["question", "answer"],
    },
    casinoComparison: {
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
  pagination: {
    page: 1,
    pageSize: 10000,
  },
});

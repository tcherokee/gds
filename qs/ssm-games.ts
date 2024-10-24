export const gamesQs = (slug: string = "", sort: string = "", page: number = 1) => ({
  fields: ["title", "slug", "ratingAvg", "ratingCount", "publishedAt"],
  populate: {
    provider: {
      fields: ["title", "slug"],
      populate: {
        images: {
          fields: ["url"],
        },
      },
    },
    categories: {
      fields: ["title", "slug"],
    },
    images: {
      fields: ["url"],
    },
  },
  pagination: {
    page: page || 1,
    pageSize: 18,
    withCount: true,
  },
  filters: {
    provider: { slug: { $eq: slug } },
  },
  sort: sort,
});

export const slotProvidersQs = (slug: string) => ({
  fields: [
    "title",
    "heading",
    "slug",
    "createdAt",
    "content1",
    "content2",
    "content3",
    "showGameFilterPanel",
  ],
  populate: {
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
          fields: ["bonusAmount", "termsConditions", "cashBack", "freeSpin"],
        },
        termsAndConditions: {
          fields: ["copy", "gambleResponsibly"],
        },
        providers: {
          fields: ["title"],
          pagination: {
            page: 1,
            pageSize: 100,
          },
          populate: {
            images: {
              fields: ["url"],
            },
          },
        },
      },
    },
    faqs: {
      fields: ["question", "answer"],
    },
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
  },
  filters: {
    slug: {
      $eq: slug,
    },
  },
  pagination: {
    page: 1,
    pageSize: 1,
  },
});

export const slotProvidersOnluSlugQs = () => ({
  fields: ["slug"],
  pagination: {
    page: 1,
    pageSize: 10000,
  },
});

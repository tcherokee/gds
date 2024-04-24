// export type { HomepageQueryOptions } from '../interfaces/qs/homepage'

export const homepageQs = () => ({
  fields: ["title", "heading", "updatedAt"],
  populate: {
    blocks: {
      populate: {
        content: true,
        link: true,
        image: {
          fields: ["url"],
        },
        casinos: {
          fields: [
            "title",
            "slug",
            "ratingAvg",
            "ratingCount",
            "publishedAt",
            "badges",
          ],
          populate: {
            images: {
              fields: ["url"],
            },
            providers: {
              fields: ["title"],
              populate: {
                images: {
                  fields: ["url"],
                },
              },
            },
            bonusSection: true,
            casinoBonus: true,
            termsAndConditions: true,
            noDepositSection: true,
            freeSpinsSection: true,
          },
        },
        providers: {
          populate: {
            slotProvider: {
              fields: ["title", "slug"],
              populate: {
                images: {
                  fields: ["url"],
                },
              },
            },
          },
        },
        homeTestimonies: {
          fields: ["title", "testimony", "testifierName", "testifierTitle"],
          populate: {
            provider: {
              fields: ["title", "slug"],
              populate: {
                images: {
                  fields: ["url"],
                },
              },
            },
          },
        },
        homeFeaturedProviders: {
          populate: {
            images: {
              fields: ["url"],
            },
            providers: {
              populate: {
                fields: ["title", "slug"],
                populate: {
                  images: {
                    fields: ["url"],
                  },
                },
              },
            },
          },
        },
        providersList: {
          populate: {
            images: {
              fields: ["url"],
            },
            providers: {
              fields: ["title", "slug"],
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
    seo: {
      fields: ["metaTitle", "metaDescription"],
    },
  },
});

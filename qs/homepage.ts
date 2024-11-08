// export type { HomepageQueryOptions } from '../interfaces/qs/homepage'

import { populate } from "dotenv";

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
        introWithSlider: {
          populate: {
            // slideBtn: {
            //   fields: ["btnText", "btnLink", "btnType"],
            // },
            image: {
              fields: ["url"],
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
        overviews: {
          fields: ["title", "url"],
          populate: {
            card_img: {
              fields: ["url"],
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

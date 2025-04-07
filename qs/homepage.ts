// export type { HomepageQueryOptions } from '../interfaces/qs/homepage'

import { populate } from "dotenv";

export const homepageQs = (
  { casinoCountry = "" },
  localisation: boolean = false
) => ({
  fields: ["title", "heading", "updatedAt"],
  populate: {
    blocks: {
      on: {
        "shared.single-content": {
          populate: true,
        },
        "homepage.home-casino-list": {
          populate: {
            casinos: {
              fields: [
                "title",
                "slug",
                "ratingAvg",
                "ratingCount",
                "publishedAt",
                "Badges",
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
                countries: {
                  fields: ["countryName", "shortCode"],
                  populate: {
                    countryFlag: {
                      fields: ["url"],
                    },
                  },
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
        "shared.introduction-with-image": {
          fields: ["heading", "introduction"],
          populate: {
            image: {
              fields: ["url", "mime"],
            },
          },
        },
        "shared.intro-with-slider": {
          populate: {
            introWithSlider: {
              populate: {
                image: {
                  fields: ["url"],
                },
              },
            },
          },
        },
        "homepage.home-providers": {
          populate: {
            providersList: {
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
          },
        },
        "homepage.home-testimonies": {
          populate: {
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
          },
        },
        "homepage.home-featured-providers": {
          populate: {
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
          },
        },
        "shared.overview-block": {
          populate: {
            overviews: {
              fields: ["title", "url"],
              populate: {
                card_img: {
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

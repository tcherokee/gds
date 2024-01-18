export const gamepageQs = (slug: string | undefined) => ({
  fields: [
    "title",
    "heading",
    "slug",
    "introduction",
    "content1",
    "ratingAvg",
    "ratingCount",
    "views",
    "isGameDisabled",
    "gameDisableText",
  ],
  populate: {
    author: {
      fields: [
        "firstName",
        "lastName",
        "linkedInLink",
        "twitterLink",
        "facebookLink",
        "content1",
        "jobTitle",
        "experience",
        "areaOfWork",
        "specialization",
      ],
      populate: {
        photo: {
          fields: ["url"],
        },
      },
    },
    howTo: {
      fields: ["title", "description"],
      populate: {
        howToGroup: {
          fields: ["heading", "copy"],
          populate: {
            image: {
              fields: ["url", "width", "height"],
            },
          },
        },
      },
    },
    proscons: {
      populate: {
        pros: true,
        cons: true,
        proImage: {
          fields: ["url", "width", "height"],
        },
        conImage: {
          fields: ["url", "width", "height"],
        },
      },
    },
    categories: {
      fields: ["title"],
    },
    embedCode: {
      fields: ["desktopEmbedCode", "mobileEmbedCode"],
    },
    faqs: {
      fields: ["question", "answer"],
    },
    gameInfoTable: {
      fields: [
        "rtp",
        "volatilita",
        "layout",
        "lineeDiPuntata",
        "puntataMinima",
        "puntataMassima",
        "jackpot",
        "freeSpins",
        "bonusGame",
      ],
    },
    images: {
      fields: ["url"],
    },
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
              populate: {
                images: {
                  fields: ["url"],
                },
              },
            },
            images: {
              fields: ["url"],
            },
          },
          sort: "ratingAvg:desc",
          pagination: {
            page: 1,
            pageSize: 10,
          },
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
            providers: {
              fields: ["title"],
              populate: {
                images: {
                  fields: ["url"],
                },
              },
              pagination: {
                page: 1,
                pageSize: 100,
              },
            },
            termsAndConditions: {
              fields: ["copy", "gambleResponsibly"],
            },
          },
        },
      },
    },
    seo: {
      fields: ["metaTitle", "metaDescription"],
    },
    liveCasinoStats: {
      fields: ["showLiveStats", "game", "casinoId", "tableId"],
    },
    blocks: {
      populate: {
        image: {
          fields: ["url", "alternativeText", "mime"],
        },
        ImageCarousel: {
          fields: ["url", "caption"],
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

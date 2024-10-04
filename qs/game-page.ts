export const gamepageQs = (slug: string) => ({
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
    },
    seo: {
      fields: ["metaTitle", "metaDescription"],
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
      $eq: slug
    }
  },
  pagination: {
    page: 1,
    pageSize: 1,
  },
});

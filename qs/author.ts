export const authorPageQs = () => {
  return {
    fields: [
      "id",
      "username",
      "email",
      "firstName",
      "lastName",
      "heading",
      "content1",
      "jobTitle",
      "facebookLink",
      "linkedInLink",
      "slug",
      "twitterLink",
      "experience",
      "areaOfWork",
      "specialization",
      "isAnAuthor",
      "bio",
    ],
    populate: {
      photo: {
        populate: {
          fields: ["url"],
        },
      },
      blogs: {
        fields: [
          "title",
          "slug",
          "createdAt",
          "updatedAt",
          "publishedAt",
          "content1",
        ],
        populate: {
          images: {
            fields: ["url"],
          },
          author: {
            fields: ["firstName", "lastName"],
            populate: {
              photo: {
                fields: ["url"],
              },
            },
          },
          seo: {
            fields: ["metaTitle", "metaDescription"],
          },
        },
      },
      games: {
        fields: ["title", "slug", "ratingAvg", "ratingCount"],
        populate: {
          images: {
            fields: ["url"],
          },
          provider: {
            fields: ["slug"],
            populate: {
              images: {
                fields: ["url"],
              },
            },
          },
          categories: {
            fields: ["title"],
          },
        },
      },
      casinos: {
        fields: ["title", "slug", "ratingAvg", "ratingCount"],
        populate: {
          casinoBonus: {
            fields: ["bonusUrl", "bonusLabel", "bonusCode"],
          },
          noDepositSection: {
            fields: ["bonusAmount", "termsConditions"],
          },
          freeSpinsSection: {
            fields: ["bonusAmount", "termsConditions"],
          },
          termsAndConditions: {
            fields: ["copy", "gambleResponsibly"],
          },
          bonusSection: {
            fields: ["bonusAmount", "termsConditions", "cashBack", "freeSpin"],
          },
          providers: {
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
        filters: {
          publishedAt: {
            $notNull: true,
          },
        },
      },
      seo: {
        fields: ["metaTitle", "metaDescription"],
      },
    },
    filters: {
      isAnAuthor: {
        $eq: true,
      },
    },
  };
};

export const authorCardQs = () => {
  return {
    fields: [
      "id",
      "firstName",
      "lastName",
      "content1",
      "facebookLink",
      "linkedInLink",
      "twitterLink",
      "slug",
      "isAnAuthor",
      "jobTitle",
    ],
    populate: {
      photo: {
        populate: {
          fields: ["url"],
        },
      },
    },
    filters: {
      isAnAuthor: {
        $eq: true,
      },
    },
  };
};

export const authorIndexQs = () => {
  return {
    fields: ["id"],
    populate: {
      authorPage: {
        fields: [
          "metaTitle",
          "metaDescription",
          "content1",
          "content2",
          "content3",
          "jobTitle",
          "experience",
          "areaOfWork",
          "specialization",
          "jobTitle",
        ],
      },
    },
  };
};

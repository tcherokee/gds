export const casinopageQs = () => ({
  fields: [
    "title",
    "slug",
    "createdAt",
    "updatedAt",
    "heading",
    "introduction",
    "authorRatings",
    "content1",
    "content2",
    "content3",
    "content4",
    "playthrough",
    "ratingAvg",
    "ratingCount",
  ],
  populate: {
    images: {
      fields: ["url"],
    },
    casinoFeatures: {
      fields: ["feature"],
    },
    bonusSection: {
      fields: ["bonusAmount", "availability", "speed", "cashBack", "freeSpin"],
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
    noDepositSection: {
      fields: ["bonusAmount", "availability", "speed"],
    },
    freeSpinsSection: {
      fields: ["bonusAmount", "availability", "speed"],
    },
    termsAndConditions: {
      fields: ["heading", "copy", "gambleResponsibly"],
    },
    paymentOptions: {
      fields: [
        "creditCard",
        "skrill",
        "paypal",
        "postepay",
        "wireTransfer",
        "neteller",
        "ukash",
        "paysafe",
      ],
    },
    casinoGeneralInfo: {
      fields: [
        "website",
        "regulationLicense",
        "telephone",
        "societa",
        "email",
        "address",
        "wageringRequirements",
        "downloadApp",
        "vip",
      ],
    },
    casinoBonus: {
      fields: ["bonusLabel", "bonusUrl", "bonusCode"],
    },
    testimonial: {
      fields: ["testimonial"],
      populate: {
        approvedBy: {
          fields: ["firstName", "lastName", "jobTitle"],
          populate: {
            photo: {
              fields: ["url"],
            },
          },
        },
      },
    },
    faqs: {
      fields: ["question", "answer"],
    },
    author: {
      fields: [
        "firstName",
        "lastName",
        "linkedInLink",
        "facebookLink",
        "twitterLink",
        "jobTitle",
        "content1",
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
    providers: {
      fields: ["title", "slug"],
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
    seo: {
      fields: ["metaTitle", "metaDescription"],
    },
    casinoComparison: {
      fields: [
        "title",
        "slug",
        "ratingAvg",
        "ratingCount",
        "playthrough",
        "publishedAt",
      ],
      populate: {
        images: {
          fields: ["url"],
        },
        bonusSection: {
          fields: ["bonusAmount", "termsConditions", "cashBack", "freeSpin"],
        },
        noDepositSection: {
          fields: ["bonusAmount", "termsConditions"],
        },
        freeSpinsSection: {
          fields: ["bonusAmount", "termsConditions"],
        },
        casinoBonus: {
          fields: ["bonusUrl", "bonusLabel", "bonusCode"],
        },
        providers: {
          fields: ["title", "slug"],
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
          fields: ["copy"],
        },
      },
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
  pagination: {
    page: 1,
    pageSize: 10000,
  },
});

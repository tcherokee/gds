export const customPageQs = () => {
  return {
    fields: ["title", "urlPath", "createdAt", "updatedAt", "showContentDate"],
    populate: {
      seo: {
        fields: ["metaTitle", "metaDescription"],
      },
      breadcrumbs: {
        fields: ["breadCrumbText", "breadCrumbUrl"],
      },
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
      liveCasinoStats: {
        fields: ["showLiveStats", "game", "casinoId", "tableId"],
      },
      blocks: {
        populate: {
          content: true,
          image: {
            fields: ["url", "alternativeText", "mime"],
          },
          slot_categories: {
            fields: ["title", "slug"],
          },
          slot_providers: {
            fields: ["title", "slug"],
          },
          casinosList: {
            fields: ["id"],
            populate: {
              casino: {
                fields: [
                  "title",
                  "slug",
                  "ratingAvg",
                  "ratingCount",
                  "publishedAt",
                ],
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
                  },
                  casinoGeneralInfo: {
                    fields: ["wageringRequirements"],
                  },
                  termsAndConditions: {
                    fields: ["copy", "gambleResponsibly"],
                  },
                },
              },
            },
          },
          casinos: {
            fields: ["id"],
            populate: {
              casino: {
                fields: [
                  "title",
                  "slug",
                  "ratingAvg",
                  "ratingCount",
                  "publishedAt",
                ],
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
                  termsAndConditions: {
                    fields: ["copy", "gambleResponsibly"],
                  },
                },
              },
            },
          },
          gameProviders: {
            fields: ["id"],
            populate: {
              slotProvider: {
                fields: ["id", "slug"],
              },
            },
          },
          gameCategories: {
            fields: ["id"],
            populate: {
              slotCategory: {
                fields: ["id", "slug"],
              },
            },
          },
          homeFeaturedProviders: {
            fields: ["title"],
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
          providers: {
            fields: ["title", "slug"],
            populate: {
              images: {
                fields: ["url"],
              },
            },
          },
          howToGroup: {
            fields: ["heading", "copy"],
            populate: {
              image: {
                fields: ["url", "width", "height", "alternativeText"],
              },
            },
          },
          imageWithParagraph: {
            fields: ["heading", "copy"],
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
            },
          },
          imageWithContent: {
            fields: ["title", "content"],
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
            },
          },
          pros: true,
          cons: true,
          proImage: {
            fields: ["url", "width", "height"],
          },
          conImage: {
            fields: ["url", "width", "height"],
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
  };
};

export const customPageLayoutAddOnsQs = () => ({
  populate: {
    filterProviders: {
      fields: ["slug"],
      populate: {
        images: {
          fields: ["url"],
        },
      },
    },
    most_loved_casinos: {
      fields: ["slug", "title"],
      populate: {
        logoIcon: {
          fields: ["url"],
        },
        bonusSection: true,
      },
    },
    no_deposit_casinos: {
      fields: ["slug", "title"],
      populate: {
        logoIcon: {
          fields: ["url"],
        },
        noDepositSection: true,
      },
    },
    free_spin_casinos: {
      fields: ["slug", "title"],
      populate: {
        logoIcon: {
          fields: ["url"],
        },
        freeSpinsSection: true,
      },
    },
  },
});

import { populate } from "dotenv";
import { slotCategories } from "../utils/api-requests";

export const customPageQs = (path: string, casinoCountry: string) => {
  return {
    fields: [
      "title",
      "urlPath",
      "createdAt",
      "updatedAt",
      "showContentDate",
      "sideBarToShow",
    ],
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
          overviews: {
            fields: ["title", "url"],
            populate: {
              card_img: {
                fields: ["url"],
              },
            },
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
                  countries: {
                    fields: ["countryName", "shortCode"],
                  },
                },
                filters: {
                  ...(casinoCountry && {
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
                  countries: {
                    fields: ["countryName", "shortCode"],
                  },
                },
                filters: {
                  ...(casinoCountry && {
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
          homeCategoriesList: {
            populate: {
              slot_categories: {
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
          categoriesList: {
            populate: {
              slot_categories: {
                fields: ["title", "slug"],
                populate: {
                  images: {
                    fields: ["url"],
                  },
                },
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
          tournamentTable:true
        },
      },
    },
    filters: {
      urlPath: {
        $eq: path,
      },
    },
    pagination: {
      page: 1,
      pageSize: 10000,
    },
  };
};

export const customPageLayoutAddOnsQs = (casinoCountry: string = "") => ({
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
      filters: {
        ...(casinoCountry && {
          countries: {
            shortCode: {
              $in: casinoCountry,
            },
          },
        }),
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
      filters: {
        ...(casinoCountry && {
          countries: {
            shortCode: {
              $in: casinoCountry,
            },
          },
        }),
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
      filters: {
        ...(casinoCountry && {
          countries: {
            shortCode: {
              $in: casinoCountry,
            },
          },
        }),
      },
    },
    most_loved_sports: {
      fields: ["slug", "title"],
      populate: {
        logoIcon: {
          fields: ["url"],
        },
        bonusSection: true,
      },
      filters: {
        ...(casinoCountry && {
          countries: {
            shortCode: {
              $in: casinoCountry,
            },
          },
        }),
      },
    },
    no_deposit_sports: {
      fields: ["slug", "title"],
      populate: {
        logoIcon: {
          fields: ["url"],
        },
        noDepositSection: true,
      },
    },
    free_spin_sports: {
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

export const customPageOnlySlugQs = () => {
  return {
    fields: ["urlPath"],
    pagination: {
      page: 1,
      pageSize: 10000,
    },
  };
};

import { populate } from "dotenv";
import { slotCategories } from "../utils/api-requests";

export const customPageMetadataQs = (path: string) => ({
  fields: ["title", "urlPath", "publishedAt"], // Only the metadata fields you need
  filters: {
    urlPath: { $eq: path },
  },
  pagination: { page: 1, pageSize: 1 },
});

export const customPageQs = (
  path: string,
  casinoCountry: string,
  localisation: boolean = false
) => {
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
        on: {
          "shared.introduction-with-image": {
            fields: ["heading", "introduction"],
            populate: {
              image: {
                fields: ["url", "mime"],
              },
            },
          },
          "games.new-and-loved-slots": {
            populate: {
              slot_categories: {
                fields: ["title", "slug"],
              },
              slot_providers: {
                fields: ["title", "slug"],
              },
            },
          },
          "games.games-carousel": {
            populate: {
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
            },
          },
          "shared.single-content": {
            populate: true,
          },
          "shared.image": {
            populate: {
              image: {
                fields: ["url", "alternativeText", "mime"],
              },
            },
          },
          "casinos.casino-list": {
            populate: {
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
            },
          },
          "casinos.casinos-comparison": {
            populate: {
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
          "homepage.home-featured-categories": {
            populate: {
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
            },
          },
          "shared.provider-list": {
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
          "shared.how-to-group": {
            populate: {
              howToGroup: {
                fields: ["heading", "copy"],
                populate: {
                  image: {
                    fields: ["url", "width", "height", "alternativeText"],
                  },
                },
              },
            },
          },
          "shared.image-with-paragraph": {
            populate: {
              imageWithParagraph: {
                fields: ["heading", "copy"],
                populate: {
                  image: {
                    fields: ["url", "alternativeText"],
                  },
                },
              },
            },
          },
          "shared.medium-image-with-content": {
            fields: ["title", "content"],
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
            },
          },
          "shared.pros-and-cons": {
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
          "shared.image-carousel": {
            fields: ["carouselTitle"],
            populate: {
              image: {
                fields: ["url", "alternativeText", "mime"],
              },
            },
          },
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

export const customPageLayoutAddOnsQs = (
  casinoCountry: string = "",
  localisation: boolean = false
) => ({
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
    no_deposit_casinos: {
      fields: ["slug", "title"],
      populate: {
        logoIcon: {
          fields: ["url"],
        },
        noDepositSection: true,
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
    free_spin_casinos: {
      fields: ["slug", "title"],
      populate: {
        logoIcon: {
          fields: ["url"],
        },
        freeSpinsSection: true,
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
    most_loved_sports: {
      fields: ["slug", "title"],
      populate: {
        logoIcon: {
          fields: ["url"],
        },
        bonusSection: true,
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
        // freeSpinsSection: true,
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

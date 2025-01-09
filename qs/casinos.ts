// Import Types
import type { CasinoFilters } from "../interfaces/common/types";

export const casinosQs = ({
  limit = 1000,
  sort = "ratingAvg:desc",
  providers = [""],
  ids = [],
  bonusKey = "",
  condition = "",
  amount = "",
  wagering = "",
  speed = "",
  casinoCountry = "",
}: CasinoFilters) => {
  return {
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
      casinoGeneralInfo: {
        fields: ["wageringRequirements"],
      },
      countries: {
        fields: ["countryName", "shortCode"],
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
      ...(casinoCountry && {
        countries: {
          shortCode: {
            $in: casinoCountry,
          },
        },
      }),
      ...(providers && {
        providers: {
          slug: {
            $in: providers,
          },
        },
      }),
      ...(ids && {
        id: {
          $in: ids,
        },
      }),
      ...(wagering && {
        casinoGeneralInfo: {
          wageringRequirements: {
            $eq: wagering,
          },
        },
      }),
      ...(bonusKey && {
        $and: [
          {
            [bonusKey]: {
              bonusAmount: {
                $ne: 0,
              },
            },
          },
          {
            [bonusKey]: {
              bonusAmount: {
                $notNull: true,
              },
            },
          },
          {
            ...(condition && {
              [bonusKey]: {
                availability: {
                  $eq: condition,
                },
              },
            }),
          },
          {
            ...(amount && {
              [bonusKey]: {
                bonusAmount: {
                  $eq: amount,
                },
              },
            }),
          },
          {
            ...(speed && {
              [bonusKey]: {
                speed: {
                  $eq: "Immediate",
                },
              },
            }),
          },
        ],
      }),
    },
    ...(sort && { sort: [sort] }),
    pagination: {
      pageSize: limit,
    },
  };
};

// Import Types
import type { SportFilters } from "../interfaces/common/types";

export const sportsQs = ({
  limit = 1000,
  sort = "ratingAvg:desc",
  providers = [""],
  ids = [],
  bonusKey = "",
  condition = "",
  amount = "",
  wagering = "",
  speed = "",
}: SportFilters) => {
  return {
    fields: ["title", "slug", "ratingAvg", "ratingCount"],
    populate: {
      sportBonus: {
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
      sportGeneralInfo: {
        fields: ["wageringRequirements"],
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
        sportGeneralInfo: {
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

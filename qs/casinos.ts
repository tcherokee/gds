
export const casinosQs = (
    limit = 10,
    sort = '',
    providers = '',
    filters = '',
    bonusKey = '',
    condition = '',
    amount = '',
    wagering = '',
    speed = ''
) => {

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
    }
}
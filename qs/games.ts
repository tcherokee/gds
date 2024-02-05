import type { GameFilters } from "../interfaces/common/types";

export const gamesQs = ({
  limit = 10,
  sort = "ratingAvg:desc",
  page = 1,
  providers = [],
  categories = []
}: GameFilters) => {
  return {
    fields: ["title", "slug", "ratingAvg", "publishedAt"],
    populate: {
      images: {
        fields: ["url"],
      },
      provider: {
        fields: ["slug", "title"],
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
    sort: [sort, "title"],
    pagination: {
      page,
      pageSize: limit,
    },
    filters: {
      ...(providers && {
        provider: {
          slug: {
            $in: providers,
          },
        },
      }),
      ...(categories && {
        categories: {
          slug: {
            $in: categories,
          },
        },
      }),
    }
  };
};

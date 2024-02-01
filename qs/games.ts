import type { GamesQueryOptions, GamesQueryFilters } from "../interfaces/games";

export const gamesQs = (
  limit = 10,
  sort = "ratingAvg:desc",
  page = "1",
  providers = [],
  categories = []
): GamesQueryOptions => {
  const filters: GamesQueryFilters = {};
  if (providers.length)
    filters.provider = {
      slug: {
        $in: providers,
      },
    };
  if (categories.length)
    filters.categories = {
      slug: {
        $in: categories,
      },
    };

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
    ...(Object.keys(filters).length && {
      filters,
    }),
  };
};

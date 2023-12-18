type FilterType = {
  [key: string]: string;
}; // Replace 'any' with a more specific type if possible

export const gamesQs = (
  limit: number = 10,
  sort: string = "title",
  page: string = "1",
  providers: string = "",
  categories: string = ""
): {
  fields: string[];
  populate: {
    images: {
      fields: string[];
    };
    provider: {
      fields: string[];
      populate: {
        images: {
          fields: string[];
        };
      };
    };
    categories: {
      fields: string[];
    };
  };
  sort: string[];
  pagination: {
    page: string;
    pageSize: number;
  };
  filters?: FilterType;
} => {
  const filters = {};
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

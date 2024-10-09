export const blogcardQs = (
  pageSize: number | undefined,
  page: number | undefined,
) => ({
  fields: [
    "title",
    "slug",
    "blogBrief",
    "createdAt",
    "updatedAt",
    "content1",
    "publishedAt",
    "minutesRead",
  ],
  populate: {
    images: {
      fields: ["url"],
    },
    blogCategory: {
      fields: ["blogCategory", "slug"],
    },
    author: {
      fields: ["firstName", "lastName"],
      populate: {
        photo: {
          fields: ["url"],
        },
      },
    },
    seo: {
      fields: ["metaTitle", "metaDescription"],
    },
  },
  sort: ["createdAt:desc"],
  pagination: {
    page: page,
    pageSize: pageSize,
  },
});

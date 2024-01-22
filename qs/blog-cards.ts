export const blogcardQs = (pageSize: number | undefined) => ({
  fields: [
    "title",
    "slug",
    "createdAt",
    "updatedAt",
    "content1",
    "publishedAt",
  ],
  populate: {
    images: {
      fields: ["url"],
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
    page: 1,
    pageSize: pageSize,
  },
});

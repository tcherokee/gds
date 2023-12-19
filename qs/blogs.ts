import type { BlogQueryOptions } from '../interfaces/qs/blog'

export const blogsQs = (
  page = 1,
  pageSize = 10,
  sort = "createdAt:desc"
): BlogQueryOptions => {
  return {
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
    sort: [sort],
    pagination: {
      page,
      pageSize,
    },
  };
};
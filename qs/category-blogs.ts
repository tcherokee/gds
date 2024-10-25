import { populate } from "dotenv";

export const categoryBlogsQs = (
  pageSize: number | undefined,
  page: number | undefined,
  slug: string
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
      populate: {
        seo: {
          fields: ["metaTitle", "metaDescription"],
        },
      },
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
  filters: {
    blogCategory: {
      slug: {
        $eq: slug,
      },
    },
  },
});

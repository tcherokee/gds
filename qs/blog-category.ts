import { populate } from "dotenv";

export const blogCategoryQs = (
  pageSize: number | undefined,
  page: number | undefined,
  slug: string
) => ({
  fields: ["blogCategory", "slug", "createdAt", "updatedAt"],
  populate: {
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
    slug: {
      $eq: slug,
    },
  },
});

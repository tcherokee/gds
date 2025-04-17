import { populate } from "dotenv";

export const blogpageQs = (slug: string) => ({
  fields: [
    "title",
    "slug",
    "blogBrief",
    "createdAt",
    "updatedAt",
    "content1",
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
      fields: [
        "firstName",
        "lastName",
        "linkedInLink",
        "twitterLink",
        "facebookLink",
        "jobTitle",
        "content1",
        "experience",
        "areaOfWork",
        "specialization",
      ],
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
  filters: {
    slug: {
      $eq: slug,
    },
  },
});

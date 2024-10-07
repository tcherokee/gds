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
        "minutesRead",
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

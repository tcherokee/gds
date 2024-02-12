export const blogpageQs = () => ({
  fields: ["title", "slug", "createdAt", "updatedAt", "content1"],
  populate: {
    images: {
      fields: ["url"],
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
  pagination: {
    page: 1,
    pageSize: 10000,
  },
});

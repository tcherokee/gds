export const tournamentsQs = () => ({
  fields: ["tournamentPageHeader", "tournamentPageSubHeader"],
  populate: {
    partnerships: {
      fields: ["url"],
    },
    tournamentRegisterSteps: {
      fields: ["heading", "content"],
      populate: {
        backgroundImage: {
          fields: ["url"],
        },
        icon: {
          fields: ["url"],
        },
      },
    },
    faqs: {
      fields: ["question", "answer"],
    },
    seo: {
      fields: ["metaTitle", "metaDescription"],
    },
  }
});

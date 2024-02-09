export const categoryPagesQs = () => {
    return {
      fields: [
        "id",
        "title",
        "slug",
        "heading",
        "createdAt",
        "updatedAt",
        "content1",
        "content2",
        "content3",
      ],
      populate: {
        seo: {
          fields: ["metaTitle", "metaDescription"],
        },
        IntroductionWithImage: {
          fields: ["heading", "introduction"],
          populate: {
            image: {
              fields: ["url", "mime"],
            },
          },
        },
        relatedCasinos: {
          fields: ["title", "slug", "ratingAvg", "ratingCount"],
          populate: {
            images: {
              fields: ["url"],
            },
            casinoBonus: {
              fields: ["bonusUrl", "bonusLabel", "bonusCode"],
            },
            termsAndConditions: {
              fields: ["copy", "gambleResponsibly"],
            },
            providers: {
              fields: ["title"],
              pagination: {
                page: 1,
                pageSize: 100,
              },
              populate: {
                images: {
                  fields: ["url"],
                },
              },
            },
          },
        },
        faqs: true,
      },
      pagination: {
        page: 1,
        pageSize: 10000,
      },
    };
}
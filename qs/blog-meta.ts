export const blogmetaQs = () => ({
  populate: {
    blogMeta: {
      fields: ["blogTitle", "blogDescription"],
    },
  },
});

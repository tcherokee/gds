export type BlogQueryOptions = {
  fields: string[];
  populate?: Record<
    string,
    {
      fields: string[];
      populate?: Record<string, { fields: string[] }>;
    }
  >;
  sort: string[];
  pagination: {
    page: number;
    pageSize: number;
  };
};
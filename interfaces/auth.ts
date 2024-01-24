export type TUser = {
  bio: string;
  cover_image: {
    url: string;
  };
  email: string;
  firstName: string;
  lastName: string;
  photo: {
    url: string;
  };
  username: string;
};

export type TUserMessages = {
  content: string;
  title: string;
  users: any[];
  id: number;
  updatedAt: string;
  createdAt: string;
  publishedAt: string;
};

export type TUserReview = {
  createdAt: string;
  id: number;
  rating: number;
  review: string;
  user: {
    firstName: string;
    lastName: string;
    username: string;
    id: number;
    photo: {
      url: string;
    };
  };
};

export type TReviewResponse = {
  reviews: TUserReview[];
  ratingCounts: TRatingCounts;
  totalReviews: number;
};

export type TRatingCounts = {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
};

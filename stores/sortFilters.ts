import { atom } from "nanostores";

export const filterOptions = atom({
  "Free Spins": "freeSpinsSection",
  "No Deposit": "noDepositSection",
  "Playthrough": "playthrough",
});

export const sortOptions = atom({
  "Newest": "createdAt:desc",
  "Most Popular": "views:desc",
  "Top Rated": "ratingAvg:desc",
  "Top Rated Author": "authorRatings:desc",
  "Top Rated Users": "ratingAvg:desc",
  "Most Viewed": "views:desc",
});

import { persistentMap } from "@nanostores/persistent";
import type { GameFavourites } from "../interfaces/games";

// export const favourites = persistentMap<Product[]>("cart", [], {
//   encode: JSON.stringify,
//   decode: JSON.parse,
// });

export const favourite = persistentMap<GameFavourites>("favourites:", {
  "689": {
    createdAt: "2023-11-29T08:27:48.397Z",
    title: "Cleopatra Christmas",
    slug: "cleopatra-christmas",
    ratingAvg: 3.62,
    publishedAt: "2023-11-29T08:27:49.748Z",
    images: {
      data: {
        id: 7128,
        attributes: {
          url: "https://giochigatsby.s3.eu-west-1.amazonaws.com/Cleopatra_Christmas_7f1e823d17.jpg",
        },
      },
    },
    provider: {
      data: {
        id: 1530,
        attributes: {
          slug: "igt",
          title: "IGT",
          images: {
            data: {
              id: 6589,
              attributes: {
                url: "https://giochigatsby.s3.eu-west-1.amazonaws.com/IGT_01a75fe727.jpg",
              },
            },
          },
        },
      },
    },
    categories: {
      data: [
        {
          id: 1892,
          attributes: {
            title: "Egitto",
          },
        },
        {
          id: 1906,
          attributes: {
            title: "Festività",
          },
        },
        {
          id: 9,
          attributes: {
            title: "Cleopatra",
          },
        },
      ],
    },
  },
  "690": {
    createdAt: "2023-11-30T10:55:51.919Z",
    title: "Polar Wilds",
    slug: "polar-wilds",
    ratingAvg: 3.72,
    publishedAt: "2023-11-30T10:55:53.316Z",
    images: {
      data: {
        id: 7129,
        attributes: {
          url: "https://giochigatsby.s3.eu-west-1.amazonaws.com/Polar_Wilds_69f3fb734d.jpg",
        },
      },
    },
    provider: {
      data: {
        id: 1530,
        attributes: {
          slug: "igt",
          title: "IGT",
          images: {
            data: {
              id: 6589,
              attributes: {
                url: "https://giochigatsby.s3.eu-west-1.amazonaws.com/IGT_01a75fe727.jpg",
              },
            },
          },
        },
      },
    },
    categories: {
      data: [
        {
          id: 1907,
          attributes: {
            title: "Animali",
          },
        },
      ],
    },
  },
});
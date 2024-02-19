import { persistentAtom } from "@nanostores/persistent";
import type { TUser, TUserMessage } from "../interfaces/auth";
import { atom } from "nanostores";
import type { TDashboardGame } from "../interfaces/games";

export const user = persistentAtom<TUser | null>("_user:", null, {
  encode(value) {
    return JSON.stringify(value);
  },
  decode(value) {
    return JSON.parse(value);
  },
});

export const userFavouriteGames = atom<TDashboardGame[]>([]);
export const weeklyPickedGames = atom<TDashboardGame[]>([]);
export const userMostPlayedGames = atom<TDashboardGame[]>([]);
export const messages = atom<Array<TUserMessage>>([]);
export const readMessages = atom<Array<number>>([]);
export const slotMachineUrl = atom<string>("");

// export const messages = writable<Array<TUserMessages>>([]);
// export const readMessages = writable<Array<number>>([]);

// Fetch User Favourite Games
export const getUserFavouriteGames = async () => {
  const userFavGamesRes = await fetch(
    `${import.meta.env.BASE_URL}api/dashboard/user-games/`,
    {
      method: "GET",
    }
  );
  const userGames = await userFavGamesRes.json();
  userFavouriteGames.set(userGames);
};

import type { TournamentResponse } from "../interfaces/tournaments"

const API_BASE_URL = import.meta.env.TOURNAMENT_API_URL;
const AUTH_TOKEN = import.meta.env.TOURNAMENT_AUTH_TOKEN;
const LICENSE_KEY = import.meta.env.TOURNAMENT_LICENSE_KEY;

export async function tournamentApi<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: AUTH_TOKEN,
        License: LICENSE_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
}

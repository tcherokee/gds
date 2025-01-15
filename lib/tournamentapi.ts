import type {
  Tournament,
  TournamentResponse,
  TournamentError,
} from "../interfaces/tournaments";
import {
  TournamentDebug,
  TOURNAMENT_API_CONFIG,
  isTournamentResponse,
} from "../interfaces/tournaments";

/**
 * Main tournament API function for making requests to the tournament service
 * @param endpoint - The API endpoint to call
 * @returns Promise<TournamentResponse> - The API response
 */
export async function tournamentApi<T>(
  endpoint: string
): Promise<TournamentResponse> {
  // Start timing the request
  const startTime = performance.now();
  const requestId = crypto.randomUUID();

  try {
    // Construct request headers
    const headers = {
      "Content-Type": "application/json",
      "X-Request-ID": requestId,
      Authorization: import.meta.env.PUBLIC_TOURNAMENT_AUTH_TOKEN,
      License: import.meta.env.PUBLIC_TOURNAMENT_LICENSE_KEY,
    };

    // Log the start of the request
    console.log("🚀 Tournament API Request");

    const response = await fetch(
      `${import.meta.env.PUBLIC_TOURNAMENT_API_URL}${endpoint}/`,
      {
        method: "GET",
        headers,
      }
    );

    // Log the response
    console.log("📥 Tournament API Response");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Validate response
    if (!isTournamentResponse(data)) {
      throw new Error("Invalid response format");
    }

    // Validate each tournament in the response
    if (data.data) {
      data.data.forEach((tournament) => {
        TournamentDebug.validateTournament(tournament);
      });
    }

    // Add metadata and return
    return {
      ...data,
      metadata: {
        requestId,
        timestamp: new Date().toISOString(),
        endpoint,
        duration: performance.now() - startTime,
      },
    };
  } catch (error) {
    // Log error details
    console.group("❌ Tournament API Error");
    console.error("Error:", error);
    console.error("Request ID:", requestId);
    console.error("Endpoint:", endpoint);
    console.error(
      "Duration:",
      `${(performance.now() - startTime).toFixed(2)}ms`
    );
    console.groupEnd();

    const errorResponse = TournamentDebug.createErrorResponse(
      error as Error,
      endpoint
    );

    TournamentDebug.logTournamentError(errorResponse.error as TournamentError);

    return errorResponse;
  }
}

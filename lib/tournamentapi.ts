import type { 
  Tournament, 
  TournamentResponse,
  TournamentError 
} from '../interfaces/tournaments';
import { 
  TournamentDebug, 
  TOURNAMENT_API_CONFIG,
  isTournamentResponse 
} from '../interfaces/tournaments';

/**
 * Main tournament API function for making requests to the tournament service
 * @param endpoint - The API endpoint to call
 * @returns Promise<TournamentResponse> - The API response
 */
export async function tournamentApi<T>(endpoint: string): Promise<TournamentResponse> {
  // Start timing the request
  const startTime = performance.now();
  const requestId = crypto.randomUUID();
  
  try {
    // Log the start of the request for debugging
      console.log(`[Tournament API] Starting request ${requestId} to ${endpoint}`);
      console.log(`${import.meta.env.PUBLIC_TOURNAMENT_API_URL}${endpoint}`, import.meta.env.PUBLIC_TOURNAMENT_AUTH_TOKEN, import.meta.env.PUBLIC_TOURNAMENT_LICENSE_KEY);
    
    // Make the API request
    const response = await fetch(`${import.meta.env.PUBLIC_TOURNAMENT_API_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-ID': requestId,
        Authorization: import.meta.env.PUBLIC_TOURNAMENT_AUTH_TOKEN,
        License: import.meta.env.PUBLIC_TOURNAMENT_LICENSE_KEY,
      },
    //   timeout: TOURNAMENT_API_CONFIG.TIMEOUT
    });

    // Check for HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response
    const data = await response.json();
    
    // Validate response format
    if (!isTournamentResponse(data)) {
      throw new Error('Invalid response format');
    }

    // If we have tournament data, validate each tournament
    if (data.data) {
      data.data.forEach(tournament => {
        TournamentDebug.validateTournament(tournament);
      });
    }

    // Return response with added metadata
    return {
      ...data,
      metadata: {
        requestId,
        timestamp: new Date().toISOString(),
        endpoint,
        duration: performance.now() - startTime
      }
    };

  } catch (error) {
    // Create standardized error response
    const errorResponse = TournamentDebug.createErrorResponse(
      error as Error,
      endpoint
    );
    
    // Log the error for debugging
    TournamentDebug.logTournamentError(errorResponse.error as TournamentError);
    
    return errorResponse;
  }
}

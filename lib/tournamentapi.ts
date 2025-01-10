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

export async function tournamentApi<T>(endpoint: string): Promise<TournamentResponse> {
  const startTime = performance.now();
  const requestId = crypto.randomUUID();
  
  try {
    // Log request start
      console.log(`[Tournament API] Starting request ${requestId} to ${endpoint}`);
      console.log(`${import.meta.env.PUBLIC_TOURNAMENT_API_URL}${endpoint}`, import.meta.env.PUBLIC_TOURNAMENT_AUTH_TOKEN, import.meta.env.PUBLIC_TOURNAMENT_LICENSE_KEY);
    
    const response = await fetch(`${import.meta.env.PUBLIC_TOURNAMENT_API_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-ID': requestId,
        'Authorization': `${import.meta.env.PUBLIC_TOURNAMENT_AUTH_TOKEN}`,
        'license': import.meta.env.PUBLIC_TOURNAMENT_LICENSE_KEY
      },
    //   timeout: TOURNAMENT_API_CONFIG.TIMEOUT
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Validate response
    if (!isTournamentResponse(data)) {
      throw new Error('Invalid response format');
    }

    // Validate each tournament in the response
    if (data.data) {
      data.data.forEach(tournament => {
        TournamentDebug.validateTournament(tournament);
      });
    }

    // Add metadata
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
    const errorResponse = TournamentDebug.createErrorResponse(
      error as Error,
      endpoint
    );
    
    // Log error details
    TournamentDebug.logTournamentError(errorResponse.error as TournamentError);
    
    return errorResponse;
  }
}

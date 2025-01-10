export interface Tournament {
  name: string;
  tournamentId: number;
  backgroundImage: string;
  cardBackgroundImage: string;
  logoImage: string;
  scheduleTimerTitle: string;
  timer: number;
  isLive: boolean;
  startDate: string;
  tournamentStartTime: string;
  endDate: string;
  tournamentEndTime: string;
  spins: number;
  dailySpins?: number;
  betLevel: string;
  terms: string;
  gameId: string;
  gameTitle: string;
  type: string;
  tournamentLabel: string;
  prizePool: string;
  tagName: string;
  isFeatureTournament: boolean;
  isExclusive: boolean;
  actionButton: ActionButton;
  scoreboard: ScoreboardEntry[];
  prizePoolList: PrizePoolEntry[];
  
  _validation?: {
    isValid: boolean;
    errors: string[];
    lastValidated: string;
  };
  _state?: {
    lastFetched: string;
    fetchDuration: number;
    retryCount: number;
  };
}

export interface ActionButton {
  clickable: boolean;
  tournamentId: number;
  additionalHtml: string;
  requiresTicket: boolean;
  canUserUseTicket: boolean;
  canPlay: boolean;
  label: string;
  url: string;
  buttonCss: string;
}

export interface ScoreboardEntry {
  position: number;
  name: string;
  score: string;
  cssClass: string;
  prize: string;
}

export interface PrizePoolEntry {
  range: string;
  prize: string;
}

export interface TournamentError {
  code: string;
  message: string;
  timestamp: string;
  path?: string;
  details?: unknown;
}

export interface TournamentRequestMetadata {
  requestId: string;
  timestamp: string;
  endpoint: string;
  duration: number;
}

export interface TournamentResponse {
  success: boolean;
  message: string;
  data: Tournament[] | null;
  error?: TournamentError;
  metadata?: TournamentRequestMetadata;
  statusCode?: number;
}

export function isTournamentResponse(response: unknown): response is TournamentResponse {
  const typedResponse = response as TournamentResponse;
  return (
    typeof typedResponse === 'object' &&
    typedResponse !== null &&
    'success' in typedResponse &&
    'message' in typedResponse &&
    ('data' in typedResponse || 'error' in typedResponse)
  );
}

export function isValidTournament(tournament: unknown): tournament is Tournament {
  const t = tournament as Tournament;
  const requiredFields = [
    'name',
    'tournamentId',
    'backgroundImage',
    'startDate',
    'endDate'
  ];
  
  return requiredFields.every(field => field in t && t[field as keyof Tournament] !== undefined);
}

export const TournamentDebug = {
  validateTournament: (tournament: Tournament): boolean => {
    const errors: string[] = [];
    
    if (!tournament.name) errors.push('Missing tournament name');
    if (!tournament.tournamentId) errors.push('Missing tournamentId');
    if (!tournament.startDate || !tournament.endDate) errors.push('Missing date information');
    
    const start = new Date(tournament.startDate);
    const end = new Date(tournament.endDate);
    if (isNaN(start.getTime())) errors.push('Invalid start date');
    if (isNaN(end.getTime())) errors.push('Invalid end date');
    if (start > end) errors.push('Start date is after end date');
    
    tournament._validation = {
      isValid: errors.length === 0,
      errors,
      lastValidated: new Date().toISOString()
    };
    
    return errors.length === 0;
  },
  
  createErrorResponse: (error: Error, endpoint: string): TournamentResponse => {
    return {
      success: false,
      message: 'Tournament API Error',
      data: null,
      error: {
        code: 'TOURNAMENT_API_ERROR',
        message: error.message,
        timestamp: new Date().toISOString(),
        path: endpoint,
        details: error.stack
      },
      metadata: {
        requestId: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        endpoint,
        duration: -1
      },
      statusCode: 500
    };
  },
  
  logTournamentError: (error: TournamentError) => {
    console.error(`[Tournament API Error] ${error.code} - ${error.message}`);
    console.error(`Timestamp: ${error.timestamp}`);
    console.error(`Path: ${error.path}`);
    if (error.details) console.error('Details:', error.details);
  }
};

export const TOURNAMENT_API_CONFIG = {
  ENDPOINTS: {
    FULL_SCHEDULE: 'getTournamentFullSchedule',
    RESULTS: 'getTournamentResults',
    ACTIVE: 'getActiveTournaments'
  },
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000
} as const;

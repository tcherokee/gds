// Main tournament interface defining the structure of a tournament object
export interface Tournament {
  // Basic tournament information
  name: string;
  tournamentId: number;
  backgroundImage: string;
  cardBackgroundImage: string;
  logoImage: string;

  // Tournament timing and status
  scheduleTimerTitle: string;
  timer: number | string;
  isLive: boolean;
  startDate: string;
  tournamentStartTime: string;
  endDate: string;
  tournamentEndTime: string;

  // Game and betting details
  spins: number;
  dailySpins?: number;
  betLevel: string;
  terms: string;
  gameId: string;
  gameTitle: string;

  // Tournament classification
  type: string;
  tournamentLabel: string;
  prizePool: number | string;
  tagName: string;
  isFeatureTournament: boolean;
  isExclusive: boolean;

  // Interactive elements and results
  actionButton: ActionButton;
  scoreboard: ScoreboardEntry[];
  prizePoolList: PrizePoolEntry[];

  // Debug and validation metadata
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

// Interface for tournament action buttons
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

// Interface for scoreboard entries
export interface ScoreboardEntry {
  position: number;
  name: string;
  score: string;
  cssClass: string;
  prize: string;
}

// Interface for prize pool entries
export interface PrizePoolEntry {
  range: string;
  prize: string;
}

// Structured error interface for detailed error reporting
export interface TournamentError {
  code: string; // Error code for categorization
  message: string; // Human-readable error message
  timestamp: string; // When the error occurred
  path?: string; // API endpoint where error occurred
  details?: unknown; // Additional error details
}

// Interface for tracking API request metadata
export interface TournamentRequestMetadata {
  requestId: string; // Unique identifier for the request
  timestamp: string; // When the request was made
  endpoint: string; // API endpoint called
  duration: number; // How long the request took
}

// Main response interface for tournament API calls
export interface TournamentResponse {
  success: boolean;
  message: string;
  data: Tournament[] | null;
  error?: TournamentError;
  metadata?: TournamentRequestMetadata;
  statusCode?: number;
}

// Type guard to verify if a response matches the TournamentResponse interface
export function isTournamentResponse(
  response: unknown
): response is TournamentResponse {
  const typedResponse = response as TournamentResponse;
  return (
    typeof typedResponse === "object" &&
    typedResponse !== null &&
    "success" in typedResponse &&
    "message" in typedResponse &&
    ("data" in typedResponse || "error" in typedResponse)
  );
}

// Type guard to verify if an object is a valid Tournament
export function isValidTournament(
  tournament: unknown
): tournament is Tournament {
  const t = tournament as Tournament;
  const requiredFields = [
    "name",
    "tournamentId",
    "backgroundImage",
    "startDate",
    "endDate",
  ];

  return requiredFields.every(
    (field) => field in t && t[field as keyof Tournament] !== undefined
  );
}

// Debug utilities for tournament operations
export const TournamentDebug = {
  // Validates a tournament object and updates its _validation state
  validateTournament: (tournament: Tournament): boolean => {
    const errors: string[] = [];

    // Check required fields
    if (!tournament.name) errors.push("Missing tournament name");
    if (!tournament.tournamentId) errors.push("Missing tournamentId");
    if (!tournament.startDate || !tournament.endDate)
      errors.push("Missing date information");

    // Validate date logic
    const start = new Date(tournament.startDate);
    const end = new Date(tournament.endDate);
    if (isNaN(start.getTime())) errors.push("Invalid start date");
    if (isNaN(end.getTime())) errors.push("Invalid end date");
    if (start > end) errors.push("Start date is after end date");

    // Update validation state
    tournament._validation = {
      isValid: errors.length === 0,
      errors,
      lastValidated: new Date().toISOString(),
    };

    return errors.length === 0;
  },

  // Creates a standardized error response
  createErrorResponse: (error: Error, endpoint: string): TournamentResponse => {
    return {
      success: false,
      message: "Tournament API Error",
      data: null,
      error: {
        code: "TOURNAMENT_API_ERROR",
        message: error.message,
        timestamp: new Date().toISOString(),
        path: endpoint,
        details: error.stack,
      },
      metadata: {
        requestId: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        endpoint,
        duration: -1,
      },
      statusCode: 500,
    };
  },

  // Logs tournament errors in a standardized format
  logTournamentError: (error: TournamentError) => {
    console.error(`[Tournament API Error] ${error.code} - ${error.message}`);
    console.error(`Timestamp: ${error.timestamp}`);
    console.error(`Path: ${error.path}`);
    if (error.details) console.error("Details:", error.details);
  },
};

// API configuration constants
export const TOURNAMENT_API_CONFIG = {
  ENDPOINTS: {
    FULL_SCHEDULE: "getTournamentFullSchedule",
    RESULTS: "getTournamentResults",
    ACTIVE: "getActiveTournaments",
  },
  TIMEOUT: 30000, // 30 second timeout
  RETRY_ATTEMPTS: 3, // Number of retry attempts
  RETRY_DELAY: 1000, // 1 second delay between retries
} as const;

// New types for the tournaments page content
interface StrapiImage {
  data: {
    id: number;
    attributes: {
      url: string;
    };
  };
}

interface StrapiImageArray {
  data: {
    id: number;
    attributes: {
      url: string;
    };
  }[];
}

interface Partnership {
  url: string;
}

interface TournamentRegisterStep {
  heading: string;
  content: string;
  backgroundImage: StrapiImage;
  icon: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}

interface FAQ {
  question: string;
  answer: string;
}

interface SEO {
  metaTitle: string;
  metaDescription: string;
}

export interface TournamentPageContent {
  attributes: {
    tournamentPageHeader: string;
    tournamentPageSubHeader: string;
    partnerships: Partnership[];
    tournamentRegisterSteps: TournamentRegisterStep[];
    faqs: FAQ[];
    seo: SEO;
  };
}

// Strapi specific types
export interface StrapiData<T> {
  data: {
    id: number;
    attributes: T;
  };
}

export interface StrapiPartnership {
  data: {
    id: number;
    attributes: {
      url: string;
    };
  }[];
}

export interface TournamentPageAttributes {
  id: number;
  attributes: {
    tournamentPageHeader: string;
    tournamentPageSubHeader: string;
    partnerships: StrapiPartnership;
    tournamentRegisterSteps: {
      id: number;
      heading: string;
      content: string;
      backgroundImage: StrapiImage;
      icon: StrapiImage;
    }[];
    faqs: {
      id: number;
      question: string;
      answer: string;
    }[];
    seo: {
      id: number;
      metaTitle: string;
      metaDescription: string;
    }
  };
}

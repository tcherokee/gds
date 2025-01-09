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

export interface TournamentResponse {
  success: boolean;
  message: string;
  data: Tournament[];
}

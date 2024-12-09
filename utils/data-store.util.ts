const bonusSortOptions = [
  {
    id: "noDepDesc",
    value: "noDeposit",
    label: "Senza Deposito",
  },
  {
    id: "freeSpinsDesc",
    value: "freeSpins",
    label: "Giri Gratis",
  },
  {
    id: "bonusAmtDesc",
    value: "bonusAmount",
    label: "Primo Deposito",
  },
];

const availabilityOptions = [
  {
    id: "afterReg",
    value: "After Registration",
    label: "Registrazione",
  },
  {
    id: "afterValid",
    value: "After Validation",
    label: "Convalida Conto",
  },
  {
    id: "afterDep",
    value: "After Deposit",
    label: "Deposito",
  },
];

const ratingsSortOptions = [
  { value: "ratingAvg", label: "Più Votati Utenti" },
  { value: "bonusAmount", label: "Bonus Benvenuto" },
  { value: "authorStarRatings", label: "Più Votati Autore" },
  { value: "postDate", label: "Ultimi Aggiunti" },
  { value: "title", label: "Ordine Alfabetico" },
];

const gamesSortOptions = [
  { value: "nuove", label: "Nuove Slot" },
  { value: "az", label: "A-Z" },
  { value: "za", label: "Z-A" },
  { value: "giocati", label: "Più Giocati" },
  { value: "votate", label: "Più Votate" },
];

export const DataStore = {
  bonusSortOptions,
  availabilityOptions,
  ratingsSortOptions,
  gamesSortOptions,
};

export const GameInfoTable = {
  rtp: {
    infoTitle: "gameInfoHeaderRtp",
    infoValue: "rtp",
  },
  volatility: {
    infoTitle: "gameInfoHeaderVolatility",
    infoValue: "volatilita",
  },
  layout: {
    infoTitle: "gameInfoHeaderLayout",
    infoValue: "layout",
  },
  bettingLines: {
    infoTitle: "gameInfoHeaderBettingLines",
    infoValue: "lineeDiPuntata",
  },
  minimumBet: {
    infoTitle: "gameInfoHeaderMinimumBet",
    infoValue: "puntataMinima",
  },
  maximumBet: {
    infoTitle: "gameInfoHeaderMaximumBet",
    infoValue: "puntataMassima",
  },
  jackpot: {
    infoTitle: "gameInfoHeaderJackpot",
    infoValue: "jackpot",
  },
  freeSpins: {
    infoTitle: "gameInfoHeaderFreespins",
    infoValue: "freeSpins",
  },
  bonusGame: {
    infoTitle: "gameInfoHeaderBonusGame",
    infoValue: "bonusGame",
  },
};

export const urlTranslate = {
  gds: {
    "game-pages": "/slot-machines",
    "casino-pages": "/casino/recensione",
    "blog-pages": "/blog",
    "blog-index": "/blog",
    "author-page": "/author",
    "category-pages": "/slot-machine",
    "provider-pages": "/software-slot-machine",
    "casino-providers-page": "/casino-online",
    "new-games-page": "/slot-machine/nuove",
    "popular-games-page": "/slot-machine/piu-giocate",
    "top-rated-page": "/slot-machine/miglori",
    "software-page": "/slot-software",
    "sport-pages": "/scommesse",
  },
  gr: {
    "game-pages": "/gioco",
    "casino-pages": "/recensioni",
    "blog-pages": "/notizie",
    "blog-index": "/notize",
    "author-page": "/author",
    "category-pages": "/giochi-casino",
    "provider-pages": "/software",
    "casino-providers-page": "/casino-online",
    "new-games-page": "/gioco",
    "popular-games-page": "/piu-giocati",
    "top-rated-page": "/miglori",
    "software-page": "/slot-software",
    "sport-pages": "/scommesse",
  },
  sm: {
    "game-pages": "/slot-machines",
    "casino-pages": "/casino/recensione",
    "blog-pages": "/blog",
    "blog-index": "/blog",
    "author-page": "/author",
    "category-pages": "/slot-machine",
    "provider-pages": "/software-slot-machine",
    "casino-providers-page": "/casino-online",
    "new-games-page": "/slot-machine/nuove",
    "popular-games-page": "/slot-machine/piu-giocate",
    "top-rated-page": "/slot-machine/miglori",
    "software-page": "/slot-software",
    "sport-pages": "/scommesse",
  },
  csi: {
    "game-pages": "/slot-machines",
    "casino-pages": "/casino/recensione",
    "blog-pages": "/blog",
    "blog-index": "/blog",
    "author-page": "/author",
    "category-pages": "/slot-machine",
    "provider-pages": "/software-slot-machine",
    "casino-providers-page": "/casino-online",
    "new-games-page": "/slot-machine/nuove",
    "popular-games-page": "/slot-machine/piu-giocate",
    "top-rated-page": "/slot-machine/miglori",
    "software-page": "/slot-software",
    "sport-pages": "/scommesse",
  },
  csco: {
    "game-pages": "/slot-machines",
    "casino-pages": "/casino/recensione",
    "blog-pages": "/blog",
    "blog-index": "/blog",
    "author-page": "/author",
    "category-pages": "/slot-machine",
    "provider-pages": "/software-slot-machine",
    "casino-providers-page": "/casino-online",
    "new-games-page": "/slot-machine/nuove",
    "popular-games-page": "/slot-machine/piu-giocate",
    "top-rated-page": "/slot-machine/miglori",
    "software-page": "/slot-software",
    "sport-pages": "/scommesse",
  },
  csmx: {
    "game-pages": "/slot-machines",
    "casino-pages": "/casino/recensione",
    "blog-pages": "/blog",
    "blog-index": "/blog",
    "author-page": "/author",
    "category-pages": "/slot-machine",
    "provider-pages": "/software-slot-machine",
    "casino-providers-page": "/casino-online",
    "new-games-page": "/slot-machine/nuove",
    "popular-games-page": "/slot-machine/piu-giocate",
    "top-rated-page": "/slot-machine/miglori",
    "software-page": "/slot-software",
    "sport-pages": "/scommesse",
  },
  tgs: {
    "game-pages": "/slot",
    "casino-pages": "/casino-resena",
    "blog-pages": "/blog",
    "blog-index": "/blog",
    "author-page": "/author",
    "category-pages": "/temas",
    "provider-pages": "/software",
    "casino-providers-page": "/casino-proveedor",
    "new-games-page": "/gratis/nuevas",
    "popular-games-page": "/gratis/mas-jugadas",
    "top-rated-page": "/gratis/mejores",
    "software-page": "/proveedores",
    "sport-pages": "/scommesse",
  },
};

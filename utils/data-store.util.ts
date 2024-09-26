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

export const GameInfoHeader = {
  rtp: "rtp",
  volatilita: "volatilità",
  layout: "layout",
  lineeDiPuntata: "linee Di Puntata",
  puntataMinima: "puntata Minima",
  puntataMassima: "puntata Massima",
  jackpot: "jackpot",
  freeSpins: "Giri Gratis",
  bonusGame: "bonus Game",
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
    "software-page": "/slot-software",
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
    "new-games": "/gioco",
    "popular-games-page": "/piu-giocati",
    "software-page": "/slot-software",
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
    "software-page": "/slot-software",
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
    "software-page": "/slot-software",
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
    "software-page": "/slot-software",
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
    "software-page": "/slot-software",
  },
  tgs: {
    "game-pages": "/slot",
    "casino-pages": "/casino",
    "blog-pages": "/blog",
    "blog-index": "/blog",
    "author-page": "/author",
    "category-pages": "/temas",
    "provider-pages": "/software",
    "casino-providers-page": "/casino-online",
    "new-games-page": "/gratis/nuove",
    "popular-games-page": "/gratis/piu-giocate",
    "software-page": "/slot-software",
  },
};

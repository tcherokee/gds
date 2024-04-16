const COLORS = {
  bodybg: "#E0E3E6",
  bodyText: "#475059",
  white: "#fff",
  black: "#000000",
  primary: "#311242",
  secondary: "#D33372",
  transparent: "transparent",
  misc: "#FEB800",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  facebook: "#4267b2",
  twitter: "#1da1f2",
  linkedin: "#0a66c2",
  grey: {
    100: "#EEF4F9",
    300: "#CED4DA",
    500: "#7C838D",
    600: "#ADB5BD",
    700: "#485057",
  },
  blue: {
    100: "#9FCBEE",
    300: "#4994CF",
    400: "#01467C",
    450: "#013D6D",
    500: "#2C5779",
    700: "#1D394F",
    900: "#1C2028",
  },
  purple: {
    100: "#D6BDFF",
    300: "#A569F2",
    500: "#680497",
    700: "#36166A",
    800: "#680497",
    900: "#1B0028",
  },
  background: {
    1: "#e0e3e6",
    100: "#311241",
    500: "#36166A",
    700: "#311241",
    900: "#1B0B23",
  },
  accent: {
    1: "#ffd976",
    50: "#ffbb38",
    100: "#FF92BD",
    300: "#D33372",
    500: "#FFE49E",
    700: "#FEB800",
    800: "#de7d45",
    900: "#9b4e22",
  },
};
module.exports = {
  theme: {
    colors: {
      misc: COLORS.misc,
      white: COLORS.white,
      black: COLORS.black,
      secondary: COLORS.secondary,
      primary: COLORS.primary,
      success: COLORS.success,
      transparent: COLORS.transparent,
      warning: COLORS.warning,
      danger: COLORS.danger,
      facebook: COLORS.facebook,
      twitter: COLORS.twitter,
      linkedin: COLORS.linkedin,
      grey: {
        100: COLORS.grey[100],
        300: COLORS.grey[300],
        500: COLORS.grey[500],
        600: COLORS.grey[600],
        700: COLORS.grey[700],
      },
      blue: {
        100: COLORS.blue[100],
        300: COLORS.blue[300],
        400: COLORS.blue[400],
        450: COLORS.blue[450],
        500: COLORS.blue[500],
        700: COLORS.blue[700],
        900: COLORS.blue[900],
      },
      purple: {
        100: COLORS.purple[100],
        300: COLORS.purple[300],
        500: COLORS.purple[500],
        700: COLORS.purple[700],
        800: COLORS.purple[800],
        900: COLORS.purple[900],
      },
      background: {
        1: COLORS.background[1],
        100: COLORS.background[100],
        500: COLORS.background[500],
        700: COLORS.background[700],
        900: COLORS.background[900],
      },
      accent: {
        1: COLORS.accent[1],
        50: COLORS.accent[50],
        100: COLORS.accent[100],
        300: COLORS.accent[300],
        500: COLORS.accent[500],
        700: COLORS.accent[700],
        800: COLORS.accent[800],
        900: COLORS.accent[900],
      },
      "body-bg": COLORS.bodybg,
      "body-text": COLORS.bodyText,
      "secondary-tint": "#FF92BD",
      "secondary-text": COLORS.white,
      "misc-tint": "#FFE49E",
      "misc-text": COLORS.primary,
      "btn-back-to-top": COLORS.purple[500],
      // Custom Theme Colors
      // Extras
      "background-top-gradient": COLORS.background[700],
      "background-bottom-gradient": COLORS.background[500],
      "background-back-curve": COLORS.background[900],
      // Breadcrumb
      "breadcrumb-bkg": "#e6a600",
      "breadcrumb-text": COLORS.primary,
      "breadcrumb-separator": COLORS.primary,

      // Favourites
      "unfilled-favs": COLORS.white,
      "filled-favs": COLORS.danger,

      // Sign In
      "sign-in": COLORS.white,

      //Featured Sections
      "featured-bkg-headings": COLORS.white,

      // Legal
      "legal-text": COLORS.primary,
      "legal-bkg": "#e6a600",
      "game-meta-bkg": COLORS.primary,
      "gameplayer-meta-btn-bkg": COLORS.grey[500],
      "game-meta-heading": COLORS.white,
      "gameplayer-report-issue-bkg": "#842029",
      "gameplayer-report-issue-bdr": "#6e1b23",
      "gameplayer-meta-btn-icon": COLORS.primary,
      "gameplayer-report-issue-fill": COLORS.white,
      "gameplayer-meta-btn-border": COLORS.grey[500],
      "gamepage-info-table-bkg": COLORS.white,
      "gamepage-info-table-header-bkg": COLORS.primary,
      "gamepage-info-table-header-text": COLORS.white,
      "ipc-border": "#b4b4b4",
      "iwc-image-border": "#cbcbcb",
      "iwc-divider": "#cbcbcb",
      "search-outline": COLORS.white,
      "search-bkg": COLORS.transparent,
      "search-close-btn": COLORS.white,
      "favheart-path": COLORS.danger,
      "filled-fav": COLORS.danger,
      "unfilled-fav": COLORS.white,
      "white-bkg": COLORS.white,

      // Rating
      "rating-fill": COLORS.grey[300],
      "rating-stroke": COLORS.danger,
      "rating-value-fill": COLORS.accent[100],
      "rating-locked-fill": COLORS.danger,

      // Navs
      "navbar-bkg": "#ffb800",
      "navbar-text": COLORS.primary,
      "subNavbar-bkg": "#d69b00",
      "subNavbar-text": COLORS.primary,
      "nav-hover-bkg": "#d69b00",

      // Mobile Nav
      "mobile-nav-bkg": COLORS.primary,
      "mobile-nav-bars": COLORS.white,

      // Search
      "search-border-color": COLORS.white,
      "search-icon-bkg": COLORS.white,
      "search-search-bkg": "transparent",

      // Footer
      "footer-text": COLORS.primary,
      "footer-bkg": COLORS.misc,
      "footer-quicklink-text": COLORS.white,

      // scrolls
      "scroll-up-bkg": COLORS.primary,
      "scroll-up-arrow": COLORS.white,

      "heading-text": COLORS.primary,
      "btn-primary-text": COLORS.white,
      "btn-secondary-text": COLORS.white,
      "btn-misc-text": COLORS.white,
      "btn-primary-hover-text": COLORS.white,
      "btn-secondary-hover-text": COLORS.white,
      "btn-misc-hover-text": COLORS.white,

      // Blogs
      "blog-list-bkg": COLORS.background[1],
      "blog-content-bkg": COLORS.white,
      "blog-meta": "#6c757d",
      "blog-card-date-bkg": COLORS.primary,
      "blog-card-date-text": COLORS.white,
      "blog-card-shadow": "rgba(0, 0, 0, 0.15)",
      "blog-card-hover-shadow": "rgba(0, 0, 0, 0.3)",
      "blog-card-figure-bkg": COLORS.black,
      "blog-content-header-anchor": COLORS.primary,
      "newsletter-bkg": "#e6a600",

      // Casino Table
      "gold-tag-t-gradient": COLORS.accent[1],
      "gold-tag-b-gradient": COLORS.accent[50],
      "silver-tag-t-gradient": COLORS.grey[100],
      "silver-tag-b-gradient": COLORS.grey[300],
      "bronze-tag-t-gradient": COLORS.accent[800],
      "bronze-tag-b-gradient": COLORS.accent[900],
      "casino-table-header-bkg": COLORS.purple[900],
      "casino-table-header-text": COLORS.white,
      "casino-table-text": COLORS.blue[900],
      "casino-table-row-bkg": COLORS.white,
      "no-deposit-gradient": COLORS.blue[100],
      "casino-table-bkg": COLORS.grey[100],
      "casino-table-tr-border": COLORS.grey[100],

      // Providers
      "providers-img-border": "",

      // author
      "author-wrapper-bkg": COLORS.white,
      "author-wrapper-shadow": "",
      "author-wrapper-border-color": "",
      "author-mag-bkg": "",

      // Custome Page Table
      "custom-page-table-bkg": COLORS.white,
      "custom-page-table-border": "",
      "custom-page-table-shadow": "",
      "custom-page-table-text-color": "",
      "inner-content-table-bkg": COLORS.background[1],
      "table-th-td-border-color": "",

      // Quicklinks
      "quicklinks-bkg": COLORS.white,
      "quicklinks-bdr": "",
      "quicklinks-btn-color": "#0000EE",
      "quicklinks-btn-bkg": COLORS.black,
      "quicklinks-btn-active-bkg": "",

      // faqs
      "faq-header": COLORS.black,

      // Filter Panel
      "filter-provider-header-bkg": COLORS.black,
      "filter-provider-header-text": COLORS.white,
      "filter-alternate-toggle": COLORS.blue[100],
      "filter-alternate-icon": COLORS.blue[700],

      //Payment Icons
      // 'payment-border': COLORS.grey[400],
      "payment-border": "",
      "payment-bkg": COLORS.grey[100],
      // 'provider-border': COLORS.grey[400],
      "provider-border": "",

      // Custom Page variables
      "inner-content-table-tr-border": COLORS.grey[300],
      // Pagination
      "link-color": "#01579B",
      "link-hover-color": "#01467c",
      "pagination-bg-color": COLORS.white,
      "pagination-border-color": "#dee2e6",
      "pagination-disabled-color": "#6c757d",
      "pagination-disabled-bg": "#c4c9cf",
      "pagination-hover-bg": "#e9ecef",

      // Dashboard
      "dash-menu-nav-bg": COLORS.primary,
      "menu-link-text": COLORS.blue[100],
      "menu-link-text-active": COLORS.white,
      "menu-link-bg-active": COLORS.blue[300],
    },
    backgroundImage: {
      "featured-curve": `url('/src/assets/gr-curve.svg'),
                linear-gradient(
                180deg,
                ${COLORS.background[900]} 0%,
                ${COLORS.background[900]} 40%,
                ${COLORS.background[700]} 50%,
                ${COLORS.background[500]} 100%
		    )`,
      "page-top": `url('/src/assets/gr-bg-img.svg'),
                linear-gradient(
                180deg,
                ${COLORS.background[700]} 0%,
                ${COLORS.background[900]} 100%
		    )`,
    },
  },
};

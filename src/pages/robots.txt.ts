import type { APIRoute } from "astro";

const rootURL = () => {
    if (import.meta.env.ROOT_DOMAIN.includes("www")) {
      return `
Allow: /
Disallow: /go/*
        `
    } else {
        return `Disallow: /`
    }

}
const customURLS = () => {
        if (import.meta.env.SITE_ID === 'gds') {
            return `
Disallow: /it-IT/
Disallow: /es-MX/
Disallow: /es-CO/
Disallow: /en/
Disallow: /it/go/*
Disallow: /it/slots/
Disallow: /it/slot-games/
Disallow: /it/slot-casinos/snai-casino/p*
Disallow: /it/slot-casinos/betway/p*
Disallow: /it/slot-casinos/goldbet/p*
Disallow: /it/slot-casinos/888-casino/p*
Disallow: /it/slot-machine/piu-giocate/p*
Disallow: /it/casino-slots/voglia-di-vincere-casino/p*
Disallow: /it/casino-slots/betflag-casino/p*
Disallow: /it/casino-slots/admiral-yes-casino/p*
Disallow: /it/casino-slots/admiral-yes-casino/p*
Disallow: /it/slot-machine/migliori/p*
Disallow: /it/slot-software/p*
Disallow: /it/slot-casinos/slotyes/p*
Disallow: /it/giri-gratis/p*
Disallow: /it/casino/recensione/slot-machines/
Disallow: /it/software-slot-machine/slot-machines/
            `;
        }
}

const robotsTxt = `
User-agent: *
${rootURL().trim()}
${import.meta.env.IS_PROD === true ? customURLS()?.trim() : ""}

Sitemap: ${new URL("sitemap-index.xml", import.meta.env.SITE).href}
`.trim();

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};

export function serializeSchema(thing) {
	return `<script type="application/ld+json">${JSON.stringify(thing, null, 2)}</script>`;
}

export const websiteSchema = {
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	name: import.meta.env.VITE_PUBLIC_SITE_NAME,
	url: import.meta.env.VITE_PUBLIC_FULL_DOMAIN,
	description: import.meta.env.VITE_PUBLIC_SITE_DESCRIPTION,
	sameAs: [`https://www.facebook.com/slotmachinegratisonline/`],
	potentialAction: {
		'@type': 'SearchAction',
		target: `${import.meta.env.VITE_PUBLIC_FULL_DOMAIN}/search?&q={query}`,
		query: 'required',
		'query-input': 'required name=query'
	}
};

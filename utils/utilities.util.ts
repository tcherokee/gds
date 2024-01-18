import { getContext } from 'svelte'
import { get } from 'svelte/store'
export class Utilities {
	static groupArrayElements(array = [], totalElementsPerGroup) {
		let groups = []
		for (let i = 0; i < array.length; i += totalElementsPerGroup) {
			let group = []
			for (let j = 0; j < totalElementsPerGroup; j++) {
				if (array[i + j]) {
					group.push(array[i + j])
				}
			}
			groups.push(group)
		}
		return groups
	}
}

export const CleanGamesForBlock = (gamesArr) => {
	return gamesArr.map((games) => {
		return games.data.map((game) => {
			if (!game) {
				return
			}

			return { id: game.id, ...game.attributes }
		})
	})
}

export const NewCleanGamesForBlock = (gamesArr) => {
	return gamesArr.map((gameArray) => {
		return gameArray
			.map((game) => {
				return game ? { id: game.id, ...game.attributes } : null
			})
			.filter(Boolean)
	})
}

export const CleanGamesForGamePage = (games) => {
	return games.map((game) => {
		if (!game) {
			return
		}

		return { id: game.id, ...game.attributes }
	})
}

export const CleanSingleGameForGamePage = (game) => {
	if (!game) {
		return
	}

	return { id: game.id, ...game.attributes }
}

export const CleanCasinosForBlock = (casinoArr, noDepositMsg, freeSpinsMsg) => {
	//get translation context

	return casinoArr.map((casino) => {
		let wageringReqs = ''

		if (!casino) {
			return
		}
		if (casino.attributes.noDepositSection && casino.attributes.noDepositSection.termsConditions) {
			wageringReqs += `<strong>${noDepositMsg}</strong><br/>${casino.attributes.noDepositSection.termsConditions}`
		}
		if (casino.attributes.freeSpinsSection && casino.attributes.freeSpinsSection.termsConditions) {
			wageringReqs += `${
				wageringReqs.length ? '<br/><br/>' : ''
			}<strong>${freeSpinsMsg}</strong><br/>${casino.attributes.freeSpinsSection.termsConditions}`
		}
		return { id: casino.id, ...casino.attributes, wageringReqs }
	})
}

export const CleanAuthorsForAuthorPage = (authors) => {
	return authors.map((author) => {
		if (!author) {
			return
		}

		return { data: { attributes: author } }
	})
}

export const CleanAuthorCasinosForBlock = (casinoArr) => {
	return casinoArr.map((casino) => {
		if (!casino) {
			return
		}

		return {
			...casino,
			images: { data: { id: casino?.images?.id, attributes: { url: casino?.images?.url } } },
			providers: {
				data: casino.providers.map((provider) => {
					return {
						id: provider.id,
						attributes: {
							title: provider.title,
							images: {
								data: { id: provider?.images?.id, attributes: { url: provider?.images?.url } }
							}
						}
					}
				})
			}
		}
	})
}

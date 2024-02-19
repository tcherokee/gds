export class Utilities {
	static groupArrayElements(array = [], totalElementsPerGroup: any) {
		let groups = []
		for (let i = 0; i < array.length; i += totalElementsPerGroup) {
			let group: any = []
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

export const CleanGamesForBlock = (gamesArr: any) => {
	return gamesArr.map((games: any) => {
		return games.data.map((game: any) => {
			if (!game) {
				return
			}

			return { id: game.id, ...game.attributes }
		})
	})
}

export const NewCleanGamesForBlock = (gamesArr: any) => {
	return gamesArr.map((gameArray: any) => {
		return gameArray
			.map((game: any) => {
				return game ? { id: game.id, ...game.attributes } : null
			})
			.filter(Boolean)
	})
}

export const CleanGamesForGamePage = (games: any) => {
	return games.map((game: any) => {
		if (!game) {
			return
		}

		return { id: game.id, ...game.attributes }
	})
}

export const CleanSingleGameForGamePage = (game: any) => {
	if (!game) {
		return
	}

	return { id: game.id, ...game.attributes }
}

export const CleanCasinosForBlock = (casinoArr: any, noDepositMsg: any, freeSpinsMsg: any) => {
	//get translation context

	return casinoArr.map((casino: any) => {
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

export const CleanAuthorsForAuthorPage = (authors: any) => {
	return authors.map((author: any) => {
		if (!author) {
			return
		}

		return { data: { attributes: author } }
	})
}

export const CleanAuthorCasinosForBlock = (casinoArr: any) => {
	return casinoArr.map((casino: any) => {
		if (!casino) {
			return
		}

		return {
			...casino,
			images: { data: { id: casino?.images?.id, attributes: { url: casino?.images?.url } } },
			providers: {
				data: casino.providers.map((provider: any) => {
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

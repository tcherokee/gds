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

export const generatePagination = (
  currentPage: number,
  totalPageCount: number,
  maxVisiblePages = 6
): (number | string)[] => {
  if (totalPageCount <= maxVisiblePages) {
    return Array.from({ length: totalPageCount }, (_, i) => i + 1);
  }

  const pagination: (number | string)[] = [1];

  let startPage = Math.max(2, currentPage - 1);
  let endPage = Math.min(totalPageCount - 1, currentPage + 1);

  if (currentPage <= 3) {
    startPage = 2;
    endPage = 4;
  } else if (currentPage >= totalPageCount - 2) {
    startPage = totalPageCount - 3;
    endPage = totalPageCount - 1;
  }

  if (startPage > 2) pagination.push("...");
  pagination.push(
    ...Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  );
  if (endPage < totalPageCount - 1) pagination.push("...");

  pagination.push(totalPageCount);

  return pagination;
};


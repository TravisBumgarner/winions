import knex from '.'

import { MatchMetadata, Match } from '../../shared-types'

// TODO: Ask Justin how he feels about this destructuring protection. 
const insert = (matchMetadata: MatchMetadata) => {

    const {
        seasonId,
        queueId,
        gameVersion,
        platformId,
        gameMode,
        mapId,
        gameType,
        gameDuration,
        gameCreation,
        gameId
    } = matchMetadata

    return knex('matchMetadata').insert({
        seasonId,
        queueId,
        gameVersion,
        platformId,
        gameMode,
        mapId,
        gameType,
        gameDuration,
        gameCreation: new Date(gameCreation),
        gameId
    })
        .then(response => response)
        .catch(error => {
            console.log(error)
            return null
        })
}

const selectByMatchId = async (matchId: number): Promise<MatchMetadata | null> => {
    const response = await knex('matchMetadata')
        .select<MatchMetadata[]>()
        .where('gameId', matchId) // Yay inconsistancy

    return response.length === 1 ? response[0] : null
}

export { insert, selectByMatchId }
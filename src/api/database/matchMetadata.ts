import knex from '.'

import { MatchMetadata } from '../../shared-types'

const insertParticipantIdentities = async (gameId: number, participantsIdentities: MatchMetadata['participantIdentities']) => {
    const participantsMod = participantsIdentities.map(({ participantId, player }) => {

        const {
            currentPlatformId,
            summonerName,
            matchHistoryUri,
            platformId,
            currentAccountId,
            profileIcon,
            summonerId,
            accountId,
        } = player

        return {
            gameId,
            currentPlatformId,
            summonerName,
            matchHistoryUri,
            platformId,
            currentAccountId,
            participantId,
            profileIcon,
            summonerId,
            accountId,
        }
    })

    const response = await knex('participantIdentities').insert(participantsMod)
    return
}

// TODO: Ask Justin how he feels about this destructuring protection. 
const insert = async (matchMetadata: MatchMetadata) => {

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
        gameId,
        participantIdentities
    } = matchMetadata

    await insertParticipantIdentities(gameId, participantIdentities)

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
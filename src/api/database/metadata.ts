import knex from '.'

import { MatchMetadata } from '../../shared-types'

// const insertParticipantIdentities = async (gameId: number, participantsIdentities: MatchMetadata['participantIdentities']) => {
//     const participansIdentitiesMod = participantsIdentities.map(({ participantId, player }) => {

//         const {
//             currentPlatformId,
//             summonerName,
//             matchHistoryUri,
//             platformId,
//             currentAccountId,
//             profileIcon,
//             summonerId,
//             accountId,
//         } = player

//         return {
//             gameId,
//             currentPlatformId,
//             summonerName,
//             matchHistoryUri,
//             platformId,
//             currentAccountId,
//             participantId,
//             profileIcon,
//             summonerId,
//             accountId,
//         }
//     })

//     const response = await knex('participantIdentities').insert(participansIdentitiesMod)
//     return
// }

// TODO: Ask Justin how he feels about this destructuring protection. 
const insert = async (matchMetadata: MatchMetadata) => {

    return knex('matchMetadata').insert(matchMetadata)
        .then(response => response)
        .catch(error => {
            console.log(error)
            return null
        })
}

const selectByGameId = async (gameId: number): Promise<MatchMetadata | null> => {
    const response = await knex('matchMetadata')
        .select<MatchMetadata[]>()
        .where('gameId', gameId)

    return response.length === 1 ? response[0] : null
}

export { insert, selectByGameId }
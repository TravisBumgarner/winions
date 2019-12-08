import knex from '.'
import { uuid } from 'uuidv4';

import { MatchTimeline } from '../../shared-types'

// const insertParticipantFrames = async (participantFramesId: string, participantFrames: ParticipantFrames) => {
//     const participantFramesMod = Object.values(participantFrames).map(participantFrame => {
//         const {
//             totalGold,
//             teamScore,
//             participantId,
//             level,
//             currentGold,
//             minionsKilled,
//             dominionScore,
//             xp,
//             jungleMinionsKilled
//         } = participantFrame

//         return {
//             totalGold,
//             teamScore,
//             participantId,
//             level,
//             currentGold,
//             minionsKilled,
//             dominionScore,
//             xp,
//             jungleMinionsKilled,
//             id: participantFramesId
//         }
//     })
//     const response = await knex('participantFrames').insert(participantFramesMod)
//     return
// }

const insert = async (gameId: number, matchTimeline: MatchTimeline) => {
    return knex('matchTimeline').insert(matchTimeline)
        .then(response => response)
        .catch(error => {
            console.log(error)
            return null
        })
}

const selectByGameId = async (gameId: number): Promise<MatchTimeline | null> => {
    const response = await knex('matchTimeline')
        .select<MatchTimeline[]>()
        .where('gameId', gameId)

    return response.length === 1 ? response[0] : null
}

export { insert, selectByGameId }
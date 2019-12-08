import knex from '.'
import { uuid } from 'uuidv4';

import { MatchTimeline, ParticipantFrames } from '../../shared-types'

const insertParticipantFrames = async (participantFramesId: string, participantFrames: ParticipantFrames) => {
    const participantFramesMod = Object.values(participantFrames).map(participantFrame => {
        const {
            totalGold,
            teamScore,
            participantId,
            level,
            currentGold,
            minionsKilled,
            dominionScore,
            xp,
            jungleMinionsKilled
        } = participantFrame

        return {
            totalGold,
            teamScore,
            participantId,
            level,
            currentGold,
            minionsKilled,
            dominionScore,
            xp,
            jungleMinionsKilled,
            id: participantFramesId
        }
    })
    const response = await knex('participantFrames').insert(participantFramesMod)
    return
}

const insert = async (gameId: number, matchTimeline: MatchTimeline) => {
    const matchTimelineMod = matchTimeline.frames.map(async ({ timestamp, participantFrames }) => {
        const participantFramesId = uuid()

        // TODO, this insert feels gross.
        await insertParticipantFrames(participantFramesId, participantFrames)

        return {
            timestamp: new Date(timestamp),
            participantFramesId,
            gameId
        }
    })


    return knex('matchTimeline').insert(matchTimelineMod)
        .then(response => response)
        .catch(error => {
            console.log(error)
            return null
        })
}

const selectByMatchId = async (matchId: number): Promise<MatchTimeline | null> => {
    const response = await knex('matchTimeline')
        .select<MatchTimeline[]>()
        .where('gameId', matchId) // Yay inconsistancy

    return response.length === 1 ? response[0] : null
}

export { insert, selectByMatchId }
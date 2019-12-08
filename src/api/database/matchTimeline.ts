import knex from '.'
import { uuid } from 'uuidv4';

import { MatchTimeline } from '../../shared-types'

const insert = async (gameId: number, matchTimeline: MatchTimeline) => {
    const matchTimelineMod = matchTimeline.frames.map(({ timestamp }) => {
        const participantFramesId = uuid()
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
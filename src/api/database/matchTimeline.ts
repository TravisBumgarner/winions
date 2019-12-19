import knex from '.'

import { MatchTimeline } from '../../shared-types'

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
    console.log(response)
    return response.length === 1 ? response[0] : null
}

export { insert, selectByGameId }
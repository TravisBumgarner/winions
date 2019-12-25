import knex from '.'

import { Timeline } from '../../shared-types'

const insert = async (gameId: number, timeline: Timeline) => {
    return knex('timeline').insert(timeline)
        .then(response => response)
        .catch(error => {
            console.log(error)
            return null
        })
}

const selectByGameId = async (gameId: number): Promise<Timeline | null> => {
    const response = await knex('timeline')
        .select<Timeline[]>()
        .where('gameId', gameId)
    return response.length === 1 ? response[0] : null
}

export { insert, selectByGameId }
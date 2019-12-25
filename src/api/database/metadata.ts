import knex from '.'

import { Metadata } from '../../shared-types'

const insert = async (metadata: Metadata) => {

    return knex('metadata').insert(metadata)
        .then(response => response)
        .catch(error => {
            console.log(error)
            return null
        })
}

const selectByGameId = async (gameId: number): Promise<Metadata | null> => {
    const response = await knex('metadata')
        .select<Metadata[]>()
        .where('gameId', gameId)

    return response.length === 1 ? response[0] : null
}

export { insert, selectByGameId }
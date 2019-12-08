import knex from '.'

import { Match } from '../../shared-types'

const insert = (accountId: string, matches: Match[]) => {

    return knex('matches').insert(
        matches
    )
        .then(response => response)
        .catch(error => {
            console.log(error)
            return null
        })
}

const selectByAccountId = async (accountId: string): Promise<Match[]> => {
    const response = await knex('matches')
        .select<Match[]>()
        .where('accountId', accountId)
    return response
}

export { insert, selectByAccountId }
import knex from '.'

import { Match } from '../../shared-types'

const insert = (accountId: string, matches: Match[]) => {

    return knex('matches').insert(
        matches
    )
        .then(response => response)
        .catch(error => {
            console.log(error)
            return [] as Match[]
        })
}

const selectByAccountId = (accountId: string): Promise<Match[]> => {
    return knex('matches')
        .select<Match[]>()
        .where('accountId', accountId)
        .then(response => response.length ? response : [])
        .catch(error => {
            console.log(error)
            return [] as Match[]
        })
}

export { insert, selectByAccountId }
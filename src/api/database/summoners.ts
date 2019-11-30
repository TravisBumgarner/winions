import knex from '.'

import { Summoner } from '../../shared-types'

const insert = ({ id, accountId, puuid, name, profileIconId, revisionDate, summonerLevel }: Summoner) => {
    return knex('summoners').insert({
        id,
        accountId,
        puuid,
        name,
        profileIconId,
        revisionDate: new Date(revisionDate),
        summonerLevel
    })
        .then(response => response)
        .catch(error => error)
}

const select = (name: string): Promise<Summoner> => {
    return knex('summoners')
        .select()
        .whereRaw("LOWER(name) LIKE '%' || LOWER(?) || '%' ", name)
        .then(response => response)
        .catch(error => error)
}

export { insert, select }
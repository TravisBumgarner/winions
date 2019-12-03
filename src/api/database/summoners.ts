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
        .catch(error => {
            console.log(error)
            return null
        })
}

const selectBySummonerName = (summonerName: string): Promise<Summoner | null> => {
    return knex('summoners')
        .select<Summoner[]>()
        .whereRaw("LOWER(name) LIKE '%' || LOWER(?) || '%' ", summonerName)
        .then(response => response.length ? response[0] : null)
        .catch(error => {
            console.log(error)
            return null
        })
}

export { insert, selectBySummonerName }
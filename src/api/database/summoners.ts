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
            return [] as Summoner[]
        })
}

const selectBySummonerName = (summonerName: string): Promise<Summoner[]> => {
    return knex('summoners')
        .select()
        .whereRaw("LOWER(name) LIKE '%' || LOWER(?) || '%' ", summonerName)
        .then(response => response.length ? response : [])
        .catch(error => {
            console.log(error)
            return [] as Summoner[]
        })
}

const selectAll = (): Promise<Summoner[]> => {
    return knex('summoners')
        .select()
        .then(response => response)
        .catch(error => {
            console.log(error)
            return [] as Summoner[]
        })
}

export { insert, selectAll, selectBySummonerName }
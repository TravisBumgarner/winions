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

const selectBySummonerName = async (summonerName: string): Promise<Summoner | null> => {
    const response = await knex('summoners')
        .select<Summoner[]>()
        .whereRaw("LOWER(name) LIKE LOWER(?) ", summonerName)

    return response.length ? response[0] : null
}

export { insert, selectBySummonerName }
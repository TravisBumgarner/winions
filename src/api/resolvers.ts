import { IResolvers } from 'graphql-tools';

import * as database from './database'
import { leagueApi } from './services'
import { Match } from '../shared-types'

const resolvers: IResolvers = {
    Query: {
        summoner: async (_, { summonerName }) => {
            let summonerDetails = await database.summoners.selectBySummonerName(summonerName)
            console.log('1', summonerDetails)
            if (!summonerDetails) {
                summonerDetails = await leagueApi.getSummonerDetails(summonerName)

                console.log('2', summonerDetails)
                if (summonerDetails) {
                    console.log('4', summonerDetails)
                    await database.summoners.insert(summonerDetails)
                }
            }
            console.log('3', summonerDetails)
            return summonerDetails
        },
        match: async (_, { accountId }) => {
            console.log(accountId)
            let matches: Match[] | null
            matches = await database.matches.selectByAccountId(accountId)
            console.log('matches', matches)
            if (!matches.length) {
                matches = await leagueApi.getSummonerMatches(accountId)
                console.log(matches)
                if (matches) {
                    await database.matches.insert(accountId, matches)
                }
            }

            return matches
        }
    }
}

export default resolvers
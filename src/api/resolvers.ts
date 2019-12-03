import { IResolvers } from 'graphql-tools';

import * as database from './database'
import { leagueApi } from './services'
import { Match } from '../shared-types'

const resolvers: IResolvers = {
    Query: {
        summoner: async (_, { summonerName }) => {
            let summonerDetails = await database.summoners.selectBySummonerName(summonerName)
            if (!summonerDetails) {
                summonerDetails = await leagueApi.getSummonerDetails(summonerName)

                if (summonerDetails) {
                    await database.summoners.insert(summonerDetails)
                }
            }
            return summonerDetails
        },
        match: async (_, { accountId }) => {
            let matches: Match[] | null
            matches = await database.matches.selectByAccountId(accountId)
            if (!matches.length) {
                matches = await leagueApi.getSummonerMatches(accountId)
                if (matches) {
                    await database.matches.insert(accountId, matches)
                }
            }

            return matches
        }
    }
}

export default resolvers
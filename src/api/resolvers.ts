import { IResolvers } from 'graphql-tools';

import * as database from './database'

const resolvers: IResolvers = {
    Query: {
        summoner: async (_, { summonerName }) => {
            const result = summonerName
                ? await database.summoners.selectBySummonerName(summonerName)
                : await database.summoners.selectAll()
            return result
        }
    }
}

export default resolvers
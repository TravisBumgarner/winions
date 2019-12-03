// schema.ts
import 'graphql-import-node'
import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolverMap'
import { GraphQLSchema } from 'graphql'

const typeDefs = `
    type Summoner {
        name: String!
        id: String!
    }

    type Query {
        summoner(summonerName: String): [Summoner]
    }
`

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
})

export default schema
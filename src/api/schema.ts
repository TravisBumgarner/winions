// schema.ts
import 'graphql-import-node'
import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolverMap'
import { GraphQLSchema } from 'graphql'

const typeDefs = `
    type Query {
        foo: String!
        bar: String!
    }
`

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
})

export default schema
import { IResolvers } from 'graphql-tools';

const foo = (_: void, args: void): string => {
    return 'foo but separate';
}

const bar = (_: void, args: void): string => {
    return 'bar but separate';
}

const resolverMap: IResolvers = {
    Query: {
        foo,
        bar
    },
}

export default resolverMap